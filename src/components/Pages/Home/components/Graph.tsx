import React, { useRef } from 'react';
import useOnScreen from '../../../../utils';

const Graph = () => {
  const ref: any = useRef();
  const isVisible = useOnScreen(ref);

  return (
    <div className={`graph ${isVisible ? 'show' : 'hide'}`} ref={ref}>
      <div className="graph-section">
        <div className="graph-bar graph-bar-1" style={{ height: '420px' }}>
          <span>
            <b>3</b>
            pts
          </span>
          <i>1,999 cats</i>
        </div>
        <div className="graph-bar graph-bar-2" style={{ height: '512px' }}>
          <span>
            <b>4</b>
            pts
          </span>
          <i>2,600 cats</i>
        </div>
        <label>COOL</label>
      </div>
      <div className="graph-section">
        <div className="graph-bar graph-bar-3" style={{ height: '365px' }}>
          <span>
            <b>5</b>
            pts
          </span>
          <i>1,750 cats</i>
        </div>
        <div className="graph-bar graph-bar-4" style={{ height: '262px' }}>
          <span>
            <b>6</b>
            pts
          </span>
          <i>1,250 cats</i>
        </div>
        <label>WILD</label>
      </div>
      <div className="graph-section">
        <div className="graph-bar graph-bar-5" style={{ height: '205px' }}>
          <span>
            <b>7</b>
            pts
          </span>
          <i>1,000 cats</i>
        </div>
        <div className="graph-bar graph-bar-6" style={{ height: '156px' }}>
          <span>
            <b>8</b>
            pts
          </span>
          <i>750 cats</i>
        </div>
        <label>CLASSY</label>
      </div>
      <div className="graph-section">
        <div className="graph-bar graph-bar-7" style={{ height: '104px' }}>
          <span>
            <b>9</b>
            pts
          </span>
          <i>500 cats</i>
        </div>
        <div className="graph-bar graph-bar-8" style={{ height: '37px' }}>
          <span>
            <b>10</b>
            pts
          </span>
          <i>150 cats</i>
        </div>
        <label>EXOTIC</label>
      </div>
    </div>
  );
};

export default Graph;
