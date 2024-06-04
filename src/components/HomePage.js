import "../../src/HomePage.css";
import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      const videos = JSON.parse(localStorage.getItem("videos") || "[]");
      const url = URL.createObjectURL(selectedFile);
      videos.push({ id: Date.now().toString(), url, name: selectedFile.name });
      localStorage.setItem("videos", JSON.stringify(videos));
      navigate("/videos");
    }
  };

  return (
    <div className="homepage">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <VStack spacing={4}>
          <Button
            onClick={() => setIsOpen(true)}
            colorScheme="blue"
            size="md"
            height="50px"
            width="200px"
            fontSize="22px"
          >
            Add a Video
          </Button>
          <Button
            onClick={() => navigate("/videos")}
            colorScheme="green"
            size="md"
            height="50px"
            width="200px"
            fontSize="22px"
          >
            Go to Videos
          </Button>
        </VStack>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add your video here</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                />
              </Center>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                Submit
              </Button>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
};

export default HomePage;
