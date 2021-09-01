import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import * as _ from 'lodash';
const propTypes = {
  tabs: PropTypes.array.required,
  margin: PropTypes.number.required
};

var c = null;
var ctx = null;

const getTextWidth = (txt, fontSize, fontFamily) => {
  if (!ctx) {
    c = document.createElement('canvas');
    ctx = c.getContext('2d');
  }
  ctx.font = '30px Arial';
  return Math.round(ctx.measureText(txt).width);
};

const Tabs = ({ tabs, margin }) => {
  const tabsRef = useRef();
  const [visibleTabs, setVisibleTabs] = useState([]);
  const [moreTabs, setMoreTabs] = useState([]);

  useEffect(() => {
    let availableWidth = 0;
    let currentWidth = 0;
    const adjust = () => {
      debugger;
      if (tabsRef.current && tabsRef.current.clientWidth) {
        currentWidth = tabsRef.current.clientWidth;
        availableWidth = currentWidth - 100;
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

    // Create an observer instance linked to the callback function
    const callback = _.throttle(entries => {
      entries.forEach(entry => {
        adjust();
      });
    }, 1000);
    const resizeObserver = new ResizeObserver(callback);

    // Start observing the target node for configured mutations
    if (tabsRef.current) resizeObserver.observe(tabsRef.current);

    // Later, you can stop observing

    return () => {
      resizeObserver.unobserve(tabsRef.current);
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
