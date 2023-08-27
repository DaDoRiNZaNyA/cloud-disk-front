import React, { useEffect, useState } from "react";
import "./disk.css";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import {
  setCurrentDir,
  setPopupDisplay,
  exchangeDirStack,
  setView,
} from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const loader = useSelector((state) => state.app.loader);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");

  function createDirHandler() {
    dispatch(setPopupDisplay("flex"));
  }

  function backClickHandler() {
    if (dirStack.length > 1) {
      const newDirStack = [...dirStack];
      const backDirId = newDirStack[newDirStack.length - 1];
      newDirStack.pop();
      dispatch(setCurrentDir(backDirId));
      dispatch(exchangeDirStack(newDirStack));
    } else {
      dispatch(setCurrentDir(null));
    }
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files];
    files.forEach((file) => {
      dispatch(uploadFile(file, currentDir));
    });
  }

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__btns">
        <button className="disk__back" onClick={() => backClickHandler()}>
          Назад
        </button>
        <button className="disk__create" onClick={() => createDirHandler()}>
          Создать папку
        </button>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Загрузить файл
          </label>
          <input
            multiple={true}
            onChange={(event) => fileUploadHandler(event)}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
        <select
          className="disk__select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value={"name"}> По имени</option>
          <option value={"type"}> По типу</option>
          <option value={"date"}> По дате</option>
        </select>
        <button className="disk__plate" onClick={() => dispatch(setView('plate'))}></button>
        <button className="disk__list" onClick={() => dispatch(setView('list'))}></button>
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Перетащите файлы сюда
    </div>
  );
};

export default Disk;
