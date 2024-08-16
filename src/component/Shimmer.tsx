import React, { FunctionComponent } from "react";

interface Props {
  // cards: any[];
}
const Shimmer: FunctionComponent<Props> = () => {
  return (
    <div className="shimmer-container">
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
    </div>
  );
};
export default Shimmer;
