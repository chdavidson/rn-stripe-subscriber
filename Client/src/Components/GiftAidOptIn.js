import { defaultMaxListeners } from 'events'
import React from 'react'
import { CONSTANTS } from '../CONSTANTS';


const GiftAidOptIn = () => {


    return (
        <div className='gift-aid-container'>
            <p className='gift-aid-decalration'>{CONSTANTS.GIFT_AID_DECLARATION}</p>
        </div>
    )
}


export default GiftAidOptIn;