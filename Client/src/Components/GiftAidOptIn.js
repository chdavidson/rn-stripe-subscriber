import React from 'react'
import { CONSTANTS } from '../CONSTANTS';


const GiftAidOptIn = ({handleOptIn, donation}) => {


    return (
        <div className='gift-aid-container'>
            {donation}
            <div class=" m-b-2">
                <label class="toggle" for="giftaid-checkbox">
                    <input type='checkbox' class="giftaid-checkbox toggle__input" id="giftaid-checkbox" name='gift_aid' onChange={handleOptIn} />

                    <span class="toggle-track">
                    <span class="toggle-indicator">

                        <span class="checkMark">
                            <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                <path d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z"></path>
                            </svg>
                        </span>
                    </span>
                </span>
                    Yes, I would like [INSERT CHARITY NAME] to claim Gift Aid on my donation
                </label>

            </div>
            <p className='gift-aid-decalration'>{CONSTANTS.GIFT_AID_DECLARATION}</p>
        </div>
    )
}


export default GiftAidOptIn;