import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { contractABI, contractAddress } from '../utils/constants'

export const TransactionContext = React.createContext()

const { ethereum } = window

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  
  const signer = provider.getSigner()
  
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )
  return transactionContract
}

export const TransactionProvider = ({ children }) => {
  const [formData, setformData] = useState({ 
    addressTo: "", 
    amount: "", 
    keyword: "", 
    message: "" 
  })
  const [currentAccount, setCurrentAccount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"))
  const [transactions, setTransactions] = useState([])

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }

  const getAllTransactions = async () => {
    try{
      if(!ethereum)
        return toast.warn('please install metamask')
      
      const transactionContract = getEthereumContract()

      const availableTransactions = await transactionContract.getAllTransactions()

      const structuredTransactions = availableTransactions.map(transaction => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18),
      }))

      console.log({availableTransactions})
      setTransactions(structuredTransactions)
    }catch(err){
      toast.dismiss()
      toast.error(err.message)
    }

  }

  const checkIfWalletConnected = async () => {
    try{
      if(!ethereum)
        return toast.warn('please install metamask')
    
      const accounts = await ethereum.request({ method: 'eth_accounts' })
    
      if(accounts.length) {
        setCurrentAccount(accounts[0])

        getAllTransactions()
      }else{
        toast.dismiss()
        toast.warn('No accounts found')
      }
    }catch(err){
      toast.dismiss()
      toast.error(err.message)
    }
    
  }

  const connectWallet = async () => {
    try{
      if(!ethereum) 
        return toast.warn('please install metamask')

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      setCurrentAccount(accounts[0])
    }catch(err){
      toast.dismiss()
      toast.error(err.message)
    }
  }

  const checkIfTransactionExists = async () => {
    try{
      const transactionContract = getEthereumContract()

      const transactionCount = await transactionContract.getTransactionCount()

      window.localStorage.setItem("transactionCount", transactionCount)
    }catch(err){
      toast.dismiss()
      toast.error(err.message)
    }
  }

  const sendTransaction = async () => {
    try{
      if(!ethereum) 
        return alert('please install metamask')

        const {addressTo, amount, keyword, message} = formData

        const transactionContract = getEthereumContract()

        const parseAmount = ethers.utils.parseEther(amount)

        await ethereum.request({ 
          method: 'eth_sendTransaction',
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', // 21000 GWEI
            value: parseAmount._hex, //hex
          }] 
        })

        const transactionHash = await transactionContract.addToBlockchain(addressTo, parseAmount, message, keyword)
        
        setIsLoading(true)

        toast.info(`Loading transaction: ${transactionHash.hash}`)
        await transactionHash.wait()
        setIsLoading(false)
        toast.dismiss()
        toast.success(`Success transaction: ${transactionHash.hash}`)

        const transactionCount = await transactionContract.getTransactionCount()

        setTransactionCount(transactionCount.toNumber())
    }catch(err){
      toast.dismiss()
      toast.error(err.message)

      // throw new Error('Failed to send transaction')
    }
  }

  useEffect(() => {
    checkIfWalletConnected()
    checkIfTransactionExists()
  },[])

  return <TransactionContext.Provider value={
    {
      connectWallet,
      currentAccount,
      formData,
      handleChange,
      isLoading,
      sendTransaction,
      transactions,
    }
  }>
    {children}
  </TransactionContext.Provider>
}
