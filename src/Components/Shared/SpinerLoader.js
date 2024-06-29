import React from "react";
import { Dimmer, Image, Loader, Segment } from "semantic-ui-react";
function SpinerLoader() {
  return (
    <div className="modal-overlay">
      <div>
        <Loader inverted active size="large"></Loader>
      </div>
    </div>
  );
}

export default SpinerLoader;
