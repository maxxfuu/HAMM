! pip install requests ffmpeg-python
! pip install deepgram-sdk --upgrade
! pip install deepgram-sdk==2.12.0

from deepgram import Deepgram
import asyncio, json, os

dg_key = '6d3cd245d8f874f4424f704a02568d2e51e3cf69'
dg = Deepgram(dg_key)


MIMETYPE = 'mp3'

#Note: You can use '.' if your audio is in the root
DIRECTORY = '.'


# Feel free to modify your model's parameters as you wish!
options = {
    "punctuate": True,
    "diarize": True,
    "model": 'general',
    "tier": 'nova'
}

#This function is what calls on the model to transcribe
def main():
    audio_folder = os.listdir(DIRECTORY)
    for audio_file in audio_folder:
        if audio_file.endswith(MIMETYPE):
          with open(f"{DIRECTORY}/{audio_file}", "rb") as f:
              source = {"buffer": f, "mimetype":'audio/'+MIMETYPE}
              res = dg.transcription.sync_prerecorded(source, options)
              with open(f"./{audio_file[:-4]}.json", "w") as transcript:
                  json.dump(res, transcript, indent=4)
    return

main()

TAG = 'SPEAKER '

def create_transcript(output_json, output_transcript):
  lines = []
  with open(output_json, "r") as file:
    words = json.load(file)["results"]["channels"][0]["alternatives"][0]["words"]
    curr_speaker = 0
    curr_line = ''
    for word_struct in words:
      word_speaker = word_struct["speaker"]
      word = word_struct["punctuated_word"]
      if word_speaker == curr_speaker:
        curr_line += ' ' + word
      else:
        tag = TAG + str(curr_speaker) + ':'
        full_line = tag + curr_line + '\n'
        curr_speaker = word_speaker
        lines.append(full_line)
        curr_line = ' ' + word
    lines.append(TAG + str(curr_speaker) + ':' + curr_line)
    with open(output_transcript, 'w') as f:
      for line in lines:
        f.write(line)
        f.write('\n')
  return

def print_transcript():
  for filename in os.listdir(DIRECTORY):
    if filename.endswith('.json'):
      output_transcript = os.path.splitext(filename)[0] + '.txt'
      create_transcript(filename, output_transcript)

print_transcript()


SEPARATOR = '--------------------------'

def print_lines(filename):
  with open(filename, 'r') as f:
    for line in f:
      print(line)

def print_transcript():
  for filename in os.listdir(DIRECTORY):
    if filename.endswith('.txt'):
      print_lines(filename)
      print(SEPARATOR)

print_transcript()