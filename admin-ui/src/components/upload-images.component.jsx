import React, {forwardRef, useImperativeHandle, useState} from "react";
import { PlusOutlined } from '@ant-design/icons';
import {Image, Upload} from "antd";
import {toast} from "react-toastify";

const UploadImagesComponent = forwardRef((props, ref) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  function getFileList() {
    return fileList;
  }
  function resetFileList() {
    setFileList([]);
  }

  useImperativeHandle(ref, () => ({
    getFileList: getFileList,
    resetFileList: resetFileList,
  }));

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M ? true : Upload.LIST_IGNORE;
  };

  async function handlePreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  }

  async function handleChange({ fileList: newFileList }) {
    setFileList(newFileList);
  }

  async function dummyRequest({ file, onSuccess }) {
    setTimeout(() => {
      onSuccess("OK");
    }, 100);
  }

  const imagePreviewProps = {
    visible: previewOpen,
    onVisibleChange: (visible) => setPreviewOpen(visible),
    afterOpenChange: (visible) => !visible && setPreviewImage(''),
  }

  return (<>
    <Upload
      customRequest={dummyRequest}
      listType="picture-card"
      fileList={fileList}
      beforeUpload={beforeUpload}
      onPreview={handlePreview}
      onChange={handleChange}
    >
      {fileList.length >= 8
        ? null
        : <button type="button" style={{border: 0, background: 'none'}}>
          <PlusOutlined />
          <div style={{marginTop: 8 }}>Upload</div>
        </button>
      }
    </Upload>

    {previewImage && (
      <Image wrapperStyle={{display: 'none'}}
             preview={imagePreviewProps}
             src={previewImage}
      />
    )}
  </>);
});

export default UploadImagesComponent;