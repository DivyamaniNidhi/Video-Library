import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Video Player</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ReactPlayer url={url} controls width="100%" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VideoPlayer;
