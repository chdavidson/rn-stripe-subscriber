import React from 'react'
import { CONSTANTS } from '../CONSTANTS';


const GiftAidOptIn = ({handleOptIn, donation}) => {


    return (
        <div className='gift-aid-container'>
            {donation}
            <label for="gift_aid">Yes, I would like [INSERT CHARITY NAME] to claim Gift Aid on my donation</label>
            <input type='checkbox' name='gift_aid' onChange={handleOptIn} />
            <p className='gift-aid-decalration'>{CONSTANTS.GIFT_AID_DECLARATION}</p>
        </div>
    )
}


export default GiftAidOptIn;