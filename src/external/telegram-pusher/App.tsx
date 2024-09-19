import {
  TextField,
  Stack,
  Button,
  Box,
  ButtonGroup,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  ImageListItem,
  ImageList,
  Alert,
  AlertTitle,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import { Send, Add, Delete, Save } from "@mui/icons-material";
import React from "react";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { os } from "@Native/Os";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { Chooser } from "@Native/Chooser";
import { Image } from "@Components/dapi/Image";

const App: React.FC = () => {
  const [content, setContent] = useNativeStorage("tgs_content", "");
  const [botToken, setBotToken] = useNativeStorage("tgs_bot_token", "");
  const [chatId, setChatId] = useNativeStorage("tgs_chat_id", "");

  const [buttonsPresets, setButtonsPresets] = useNativeStorage<any[]>("tgs_buttons_presets", []);
  const [buttons, setButtons] = useNativeStorage("tgs_buttons", [
    [{ text: "📦 Download", url: "https://google.com" }],
    [
      { text: "Source", url: "https://google.com" },
      { text: "Support", url: "https://google.com" },
    ],
    [{ text: "Donate", url: "https://google.com" }],
  ]);

  const [newButtonText, setNewButtonText] = React.useState("");
  const [newButtonUrl, setNewButtonUrl] = React.useState("");
  const [selectedRow, setSelectedRow] = React.useState(0);
  const [images, setImages] = React.useState<File[]>([]);
  const [document, setDocument] = React.useState<File | null>(null);

  const validBotToken = React.useMemo(() => {
    return botToken.length >= 43;
  }, [botToken]);

  const validChatId = React.useMemo(() => {
    return chatId.length >= 1;
  }, [chatId]);

  const newButtonValidText = React.useMemo(() => {
    return newButtonText.length >= 1;
  }, [newButtonText]);

  const newButtonValidUrl = React.useMemo(() => {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
    return regex.test(newButtonUrl);
  }, [newButtonUrl]);

  const handleRowChange = (event) => {
    setSelectedRow(event.target.value);
  };

  const addNewButton = () => {
    if (newButtonText && newButtonUrl) {
      const newButton = { text: newButtonText, url: newButtonUrl };
      const updatedButtons = [...buttons];

      // Check if selected row is valid
      if (selectedRow >= updatedButtons.length) {
        // If selected row is out of bounds, add new rows if needed
        updatedButtons.push([newButton]);
      } else {
        // Add button to the selected row
        updatedButtons[selectedRow] = [...updatedButtons[selectedRow], newButton];
      }

      setButtons(updatedButtons);
      setNewButtonText("");
      setNewButtonUrl("");
    }
  };

  const saveButtonsPreset = () => {
    setButtonsPresets((p) => [...p, buttons]);
  };

  const isMoreThanOneImage = React.useMemo(() => images.length > 1, [images]);
  const isImage = React.useMemo(() => images.length !== 0, [images]);

  const removeButton = (rowIndex, buttonIndex) => {
    const updatedButtons = buttons
      .map((row, i) => (i === rowIndex ? row.filter((_, j) => j !== buttonIndex) : row))
      .filter((row) => row.length > 0); // Filter out empty rows

    setButtons(updatedButtons);
  };

  const handleSave = React.useCallback(async () => {
    if (!(validBotToken || validBotToken)) {
      os.toast("Cannot send a message without Chat ID or Bot Token", Toast.LENGTH_SHORT);
      return;
    }

    const sendType = document ? "sendDocument" : isImage ? (isMoreThanOneImage ? "sendMediaGroup" : "sendPhoto") : "sendMessage";

    const data = new FormData();

    data.append("chat_id", chatId);
    // data.append("disable_notification", "true");

    // disable for meadia groups
    if (!isMoreThanOneImage) {
      data.append("parse_mode", "markdown");
      if (buttons) {
        data.append(
          "reply_markup",
          JSON.stringify({
            inline_keyboard: buttons,
          })
        );
      }
    }

    if (isImage) {
      if (images.length > 1) {
        const mediaGroup = images.map((image, index) => ({
          type: "photo",
          media: `attach://photo${index}`, // Reference to the appended Blob
          caption: index === 0 ? content : undefined, // Optionally add caption only to the first image
        }));

        // Append each image Blob to FormData with a unique name
        images.forEach((image, index) => {
          data.append(`photo${index}`, new Blob([image], { type: "image/png" }), `photo${index}.png`);
        });

        data.append("media", JSON.stringify(mediaGroup));
      } else {
        data.append("caption", content);
        data.append("photo", new Blob([images[0]], { type: "image/png" }), "photo.png");
      }
    } else if (document) {
      data.append("caption", content);
      data.append("document", new Blob([document], { type: document.type }), document.name);
    } else {
      data.append("text", content);
    }

    data.append("disable_web_page_preview", "false");

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/${sendType}`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        console.log("Message sent successfully");
      } else {
        console.warn("Error sending message: " + response.statusText);
      }
    } catch (error) {
      console.warn("Error sending message: " + (error as Error).message);
    }
  }, [botToken, chatId, content, buttons, images]);

  const renderToolbar = () => {
    return (
      <Toolbar
        modifier="noshadow"
        sx={{
          backgroundColor: "rgb(36,161,222)",
        }}
      >
        <Toolbar.Center>Telegram Pusher</Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button disabled={!(validBotToken && validChatId)} icon={Send} onClick={handleSave} />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <Page sx={{ p: 2 }} renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 2,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            required
            label="Bot Token"
            value={botToken}
            error={!validBotToken}
            onChange={(e) => {
              setBotToken(e.target.value);
            }}
            variant="filled"
          />
          <TextField
            fullWidth
            label="Chat ID"
            required
            value={chatId}
            error={!validChatId}
            onChange={(e) => {
              setChatId(e.target.value);
            }}
            variant="filled"
          />
        </Stack>

        {isMoreThanOneImage && (
          <Alert severity="error" sx={{ mt: 1 }}>
            <AlertTitle>Warning</AlertTitle>
            You're about to send a media group. Markdown and inline buttons are not available.
          </Alert>
        )}

        <TextField
          fullWidth
          label="Message content"
          variant="filled"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          sx={{
            mt: 2,
            height: "25% !important",
            "& .MuiFilledInput-root": {
              height: "100% !important",
            },
          }}
          inputProps={{
            style: {
              height: "100% !important",
              fontFamily: "monospace",
            },
          }}
          multiline
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Document
          </Typography>

          <Stack
            direction="column"
            spacing={1.5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                fullWidth
                disabled={isImage}
                variant="contained"
                onClick={() => {
                  const chooseImage = new Chooser("*/*");
                  chooseImage.onChose = (files) => {
                    if (Chooser.isSuccess(files)) {
                      setDocument(files[0] as File);
                    }
                  };
                  chooseImage.getFiles();
                }}
              >
                Add Document
              </Button>
              <Button
                fullWidth
                disabled={isImage || !document}
                variant="contained"
                onClick={() => {
                  setDocument(null as any);
                }}
              >
                Clear Document
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Images
          </Typography>

          <Stack
            direction="column"
            spacing={1.5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                fullWidth
                disabled={document !== null}
                variant="contained"
                onClick={() => {
                  const chooseImage = new Chooser("image/*");
                  chooseImage.allowMultiChoose = true;
                  chooseImage.onChose = (files) => {
                    if (Chooser.isSuccess(files)) {
                      setImages(files as File[]);
                    }
                  };
                  chooseImage.getFiles();
                }}
              >
                Add Images
              </Button>{" "}
              <Button
                fullWidth
                disabled={document !== null || !isImage}
                variant="contained"
                onClick={() => {
                  setImages([]);
                }}
              >
                Clear Images
              </Button>
            </Stack>

            {images.length !== 0 && (
              <ImageList
                sx={{
                  mt: 0,
                  width: "100%",
                  pt: 0,
                  p: 1,
                  overflow: "auto",
                  whiteSpace: "nowrap",
                  gridAutoFlow: "column",
                  gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr)) !important",
                  gridAutoColumns: "minmax(250px, 1fr)",
                }}
              >
                {images.map((image, i) => (
                  <ImageListItem
                    key={i * i}
                    sx={{
                      ml: 1,
                      mr: 1,
                    }}
                  >
                    <Box sx={{ width: "100%" }} component={Image} noOpen src={URL.createObjectURL(image)} />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Stack>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Buttons
          </Typography>

          <Box mt={1} mb={2}>
            <FormControl disabled={isMoreThanOneImage} fullWidth variant="filled">
              <InputLabel>Choose Row</InputLabel>
              <Select value={selectedRow} onChange={handleRowChange} label="Choose Row">
                {buttons.map((_, index) => (
                  <MenuItem key={index} value={index}>
                    Row {index + 1}
                  </MenuItem>
                ))}
                <MenuItem value={buttons.length}>Add New Row</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Stack
            direction="column"
            spacing={1}
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {buttons.map((buttonRow, rowIndex) => (
              <Stack
                key={rowIndex}
                direction="row"
                spacing={1}
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {buttonRow.map((button, buttonIndex) => (
                  <ButtonGroup key={buttonIndex} disabled={isMoreThanOneImage} variant="contained" sx={{ width: "100%" }}>
                    <Button sx={{ width: "100%" }}>{button.text}</Button>
                    <Button onClick={() => removeButton(rowIndex, buttonIndex)}>
                      <Delete />
                    </Button>
                  </ButtonGroup>
                ))}
              </Stack>
            ))}
          </Stack>

          <Stack
            direction="column"
            spacing={2}
            sx={{
              mt: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextField
                disabled={isMoreThanOneImage}
                label="Button Text"
                variant="filled"
                value={newButtonText}
                error={!(isMoreThanOneImage || newButtonValidText)}
                onChange={(e) => setNewButtonText(e.target.value)}
                fullWidth
              />
              <TextField
                disabled={isMoreThanOneImage}
                label="Button URL"
                value={newButtonUrl}
                variant="filled"
                error={!(isMoreThanOneImage || newButtonValidUrl)}
                onChange={(e) => setNewButtonUrl(e.target.value)}
                fullWidth
              />
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                disabled={buttons.length === 0}
                color="primary"
                onClick={saveButtonsPreset}
                endIcon={<Save />}
              >
                Save as Preset
              </Button>
              <Button
                variant="outlined"
                fullWidth
                disabled={isMoreThanOneImage || !(newButtonValidText && newButtonValidUrl)}
                color="primary"
                onClick={addNewButton}
                endIcon={<Add />}
              >
                Add new Button
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Buttons Presets
          </Typography>

          <Stack
            direction="column"
            spacing={1}
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {buttonsPresets.map((preset, presetIndex) => (
              <Card
                key={presetIndex * 7}
                sx={{
                  width: "100%",
                }}
              >
                <CardContent>
                  <Stack
                    direction="column"
                    spacing={1}
                    sx={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {preset.map((buttonRow, rowIndex) => (
                      <Stack
                        key={rowIndex}
                        direction="row"
                        spacing={1}
                        sx={{
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {buttonRow.map((button, buttonIndex) => (
                          <ButtonGroup key={buttonIndex} disabled variant="contained" sx={{ width: "100%" }}>
                            <Button sx={{ width: "100%" }}>{button.text}</Button>
                            <Button>
                              <Delete />
                            </Button>
                          </ButtonGroup>
                        ))}
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      setButtons(preset);
                    }}
                  >
                    Load preset
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setButtonsPresets((p) => p.filter((_, i) => i !== presetIndex));
                    }}
                  >
                    Delete preset
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Box>
      </Page.RelativeContent>
    </Page>
  );
};

export default App;
