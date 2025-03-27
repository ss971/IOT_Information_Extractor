const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const { exec } = require('child_process');

app.use(cors());
app.use(express.json());

app.get('/api/packet-report', (req, res) => {
  const { email, password, source } = req.query;
  console.log('Received email:', email);
  console.log('Received password:', password);
  console.log('Request came from:', source);
  
  if (source === 'SmartWatch') {
    console.log("Source is SmartWatch");
    
    // Define the paths to the Python scripts.
    const script1 = path.join(__dirname, 'samsung_adb.py');
    const script2 = path.join(__dirname, 'report_gen.py');
    const script3 = path.join(__dirname, 'generateTimeline.py');
    
    // Execute all three Python scripts sequentially.
    exec(`python ${script1} && python ${script2} && python ${script3}`, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing Python scripts:', err);
        res.status(500).send('Error generating DOCX file');
        return;
      }
      console.log('Python scripts output:', stdout);
      if (stderr) {
        console.error('Python scripts stderr:', stderr);
      }
      
      // Once the Python scripts complete, hash the DOCX file.
      const docxPath = path.join(__dirname, '..', 'Forensic_Log_Report.docx');
      const hashScript = path.join(__dirname, 'hash.py');
      exec(`python ${hashScript} ${docxPath}`, (hashErr, hashStdout, hashStderr) => {
        if (hashErr) {
          console.error("Error computing hash for DOCX file:", hashErr);
        } else {
          console.log("Hash for DOCX file:", hashStdout.trim());
        }
        // Now send the DOCX file.
        res.sendFile(docxPath, (err) => {
          if (err) {
            console.error('Error sending DOCX file:', err);
            res.status(500).send('Error sending DOCX file');
          } else {
            console.log("Sent file from", docxPath);
          }
        });
      });
    });
    
  } else if (source === 'SmartAssistant') {
    console.log("Source is SmartAssistant");
    // Path to the prettified JSON file.
    const jsonPath = path.join(__dirname, '..', 'matched_audio_transcripts.json');
    const hashScript = path.join(__dirname, 'hash.py');
    // Hash the JSON file before sending.
    exec(`python ${hashScript} ${jsonPath}`, (hashErr, hashStdout, hashStderr) => {
      if (hashErr) {
        console.error("Error computing hash for JSON file:", hashErr);
      } else {
        console.log("Hash for JSON file:", hashStdout.trim());
      }
      // Send the JSON file as a downloadable attachment.
      res.download(jsonPath, 'matched_audio_transcripts.json', (err) => {
        if (err) {
          console.error('Error sending matched audio transcripts JSON file:', err);
          res.status(500).send('Error sending JSON file');
        } else {
          console.log("Sent matched_audio_transcripts.json");
        }
      });
    });
    
  } else {
    console.log("Source is neither SmartWatch nor SmartAssistant");
    const jsonPath = path.join(__dirname, 'packet_report.json');
    res.sendFile(jsonPath, (err) => {
      if (err) {
        console.error('Error sending JSON file:', err);
        res.status(500).send('Error sending JSON file');
      }
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
