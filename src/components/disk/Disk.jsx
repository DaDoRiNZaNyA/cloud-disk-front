import React, { useEffect } from "react";
import "./disk.css";
import { useDispatch, useSelector } from "react-redux";
import { getFiles } from "../../actions/file";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);
  const dirStack = useSelector(state => state.dirStack);

  function createDirHandler(){
    dispatch(setPopupDisplay('flex'));
  }

  function backClickHandler(){
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir])

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back" onClick={() => backClickHandler()}>Назад</button>
        <button className="disk__create" onClick={() => createDirHandler()}>Создать папку</button>
      </div>
      <FileList/>
      <Popup/>
    </div>
  );
};

export default Disk;
