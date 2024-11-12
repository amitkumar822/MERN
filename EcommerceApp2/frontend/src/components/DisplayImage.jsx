import React from "react";

const DisplayImage = ({ imgUrl }) => {
  return (
    <dialog id="my_modal_4" className="modal">
      <div className="modal-box w-fit h-fit">
        <div className="max-w-[27rem] max-h-[27rem]">
          <img src={imgUrl} alt="Product Image" />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default DisplayImage;
