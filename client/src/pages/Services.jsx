import React from 'react'
import { BsShieldFillCheck } from "react-icons/bs"
import { BiSearchAlt } from "react-icons/bi"
import { RiHeart2Fill } from "react-icons/ri"
import { ServiceCard } from '../components/ServiceCard'

const Services = () => {
	return (
		<div className='flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services'>
			<div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
				<div className="flex-1 flex flex-col justify-start items-start">
					<h1 className='text-white text-3xl sm:text-5xl py-2 text-gradient'>
						Services those we <br/>
						continue to improve
					</h1>
					<p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          	The best choice for buying and selling your crypto assets, with the various super friendly services we offer
        	</p>
				</div>

			<div className='flex-1 flex flex-col justify-start items-start '>
				<ServiceCard
					color='bg-[#2952e3]'
					title='Security Guaranted'
					icon={<BsShieldFillCheck fontSize={21} className='text-white'/>}
					subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, voluptatibus. Earum reiciendis magnam asperiores eveniet.'
				/>

				<ServiceCard
          color="bg-[#8945F8]"
          title="Best Exchange Rates"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate eius inventore ullam reprehenderit rem corporis?'
        />

				<ServiceCard
					color='bg-[#F84550]'
					title='Fastest Transactions'
					icon={<RiHeart2Fill fontSize={21} className='text-white'/>}
					subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque saepe ex itaque exercitationem, nihil fugit.' 
				/>
			</div>
		</div>
	</div>
	)
}


export default Services