import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';

const propTypes = {
  tabs: PropTypes.array.required,
  margin: PropTypes.number.required
};

const getTextWidth = (txt, fontSize, fontFamily) => {
  var c = document.createElement('canvas');
  var ctx = c.getContext('2d');
  ctx.font = '30px Arial';
  return Math.round(ctx.measureText(txt).width);
};

const Tabs = ({ tabs, margin }) => {
  const tabsRef = useRef();
  const [visibleTabs, setVisibleTabs] = useState([]);
  const [moreTabs, setMoreTabs] = useState([]);

  useEffect(() => {
    const adjust = () => {
      debugger;
      if (tabsRef.current && tabsRef.current.clientWidth) {
        let availableWidth = tabsRef.current.clientWidth - 100;
        console.log(availableWidth);
        const _visibleTabs = [];
        const _moreTabs = [];
        tabs.forEach((tab, index, self) => {
          const measureWidth = getTextWidth(tab) + margin * 2;
          availableWidth -= measureWidth;
          console.log(availableWidth);
          if (availableWidth > 0) {
            _visibleTabs.push(tab);
          } else {
            _moreTabs.push(tab);
          }
        });
        console.log(_visibleTabs.length, _moreTabs.length);
        setVisibleTabs(_visibleTabs);
        setMoreTabs(_moreTabs);
      }
    };

    adjust();
    window.addEventListener('resize', adjust);

    return () => {
      window.removeEventListener('resize', adjust);
    };
  }, [tabsRef]);

  return (
    <div className="tabs" ref={tabsRef}>
      {visibleTabs.map(visibleTab => (
        <div className="tab" style={{ margin: `0px ${margin}px` }}>
          {visibleTab}
        </div>
      ))}
      <select name="" id="" style={{ width: '100px' }}>
        {moreTabs.map(moreTab => (
          <option value={moreTab}>{moreTab}</option>
        ))}
      </select>
    </div>
  );
};
Tabs.propTypes = propTypes;
export default Tabs;
