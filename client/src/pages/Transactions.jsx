import {useContext} from 'react'
import { TransactionContext } from '../context/TransactionContext'
import dummyData from '../utils/dummyData'
import { TransactionCard } from '../components/TransactionCard'
import { shortenAddress } from '../utils/shortenAddress'

const Transactions = () => {
	const {currentAccount, transactions} = useContext(TransactionContext)

	return (
		<div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
			<div className="flex flex-col md:p-12 py-12 px-4">
				{currentAccount ? (
						<h3 className="text-white text-3xl text-center my-2">
							Latest Transactions
						</h3>
					) : (
						<h3 className="text-white text-3xl text-center my-2">
							Connect your account to see the latest transactions
						</h3>
				 )}

				 <div className='flex flex-wrap justify-center items-center mt-10'>
						{transactions.reverse().map((transaction,idx) => (
							<TransactionCard
								key={idx} 
								{...transaction}
							/>
						))} 
						{/* {dummyData.reverse().map(transaction => (
							<TransactionCard
								key={transaction.id} 
								{...transaction}
							/>
						))} */}
				 </div>
			</div>
		</div>
	)
}

export default Transactions
