import React from 'react'
import { CONSTANTS } from '../CONSTANTS';


const GiftAidOptIn = ({handleOptIn, donation}) => {


    return (
        <div className='gift-aid-container'>
            {donation}
            <p className='gift-aid-decalration'>{CONSTANTS.GIFT_AID_DECLARATION}</p>
            <input type='checkbox' name='gift_aid' onChange={handleOptIn} />
        </div>
    )
}


export default GiftAidOptIn;