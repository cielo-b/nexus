import React from 'react'
import "semantic-ui-css/semantic.min.css";

const LanguageSelector = () => {
  return (
    <div className="ui fluid search selection dropdown">
          <input type="hidden" name="country" />
          <i className="dropdown icon"></i>
          <div className="default text">Select language</div>
          <div className="menu">
          <div className="item" data-value="gb"><i className="gb flag"></i>English</div>
            <div className="item" data-value="rw">
              <i className="rw flag"></i>Kinyarwanda
            </div>
            <div className="item" data-value="fr">
              <i className="fr flag"></i>French
            </div>
          </div>
        </div>
  )
}

export default LanguageSelector
