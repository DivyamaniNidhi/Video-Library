import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Image,
  Flex,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { StarIcon, ArrowBackIcon } from "@chakra-ui/icons";
import VideoPlayer from "./VideoPlayer";
import defaultVideoImage from "../assets/media-1.jpg";

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem("videos") || "[]");
    const storedBookmarks = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    setVideos(storedVideos);
    setBookmarks(storedBookmarks);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const filteredVideos = showBookmarked
    ? videos.filter((video) => bookmarks.includes(video.id))
    : videos;

  return (
    <Box p={5}>
      <Flex justify="space-between" mb={5}>
        <Button
          onClick={() => navigate("/")}
          colorScheme="blue"
          leftIcon={<ArrowBackIcon display={{ base: "block", md: "none" }} />}
        >
          <Box display={{ base: "none", md: "block" }}>Go Back</Box>
        </Button>
        <Checkbox
          isChecked={showBookmarked}
          onChange={(e) => setShowBookmarked(e.target.checked)}
        >
          Show Bookmarked
        </Checkbox>
      </Flex>

      {filteredVideos.length === 0 ? (
        <Center h="50vh">
          <Text fontSize="xl">
            {showBookmarked ? "No bookmarked videos" : "No videos uploaded"}
          </Text>
        </Center>
      ) : (
        <SimpleGrid columns={[1, null, 3, 4]} spacing={5} mt={5}>
          {filteredVideos.map((video) => (
            <Card key={video.id}>
              <Image
                src={defaultVideoImage}
                alt={video.name}
                height="200px"
                objectFit="cover"
              />
              <CardBody>
                <Text mb={2}>{video.name}</Text>
                <Button
                  colorScheme="green"
                  mr={2}
                  onClick={() => setCurrentVideo(video)}
                >
                  Play
                </Button>
                <IconButton
                  icon={
                    bookmarks.includes(video.id) ? (
                      <StarIcon color="yellow.400" />
                    ) : (
                      <StarIcon color="gray.400" />
                    )
                  }
                  onClick={() => toggleBookmark(video.id)}
                  aria-label="Bookmark toggle"
                />
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {currentVideo && (
        <VideoPlayer
          url={currentVideo.url}
          onClose={() => setCurrentVideo(null)}
        />
      )}
    </Box>
  );
};

export default VideosPage;
