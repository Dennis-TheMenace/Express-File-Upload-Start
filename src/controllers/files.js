const File = require('../models/filestore.js');

const uploadPage = (req, res) => {
  res.render('upload');
};

const uploadFile = async (req, res) => {
  if(!req.files || !req.files.sampleFile)
  {
    return res.status(400).json({error: 'No files were uploaded!'});
  }

  const {sampleFile} = req.files;

  try
  {
    const newFile = new File(sampleFile);
    const doc = await newFile.save();
    return res.status(201).json(
    {
      message: 'File succesfully stored',
      fileID: doc._id,
    });
  }
  catch(err)
  {
    console.log(err);
    return res.status(400).json(
    {
      error: "Something went wrong uploading file"
    });
  }
};

const retrieveFile = async (req, res) => {
  if(!req.query._id)
  {
    return res.status(400).json({error: 'Missing file id'});
  }

  try
  {
    const doc = await File.findOne({_id: req.query._id}).exec();

    if(!doc)
    {
      return res.status(404).json({error: 'File not found!'});
    }

    res.set(
    {
      'Content-Type': doc.mimetype,
      'Content-Length': doc.size,
      'Content-Disposition': `filename="${doc.name}"`,
    });

    return res.send(doc.data);
  }
  catch(err)
  {
    console.log(err);
    return res.status(400).json(
    {
      error: 'Something went wronf retrieving file!',
    });
  }
};

module.exports = {
  uploadPage,
  uploadFile,
  retrieveFile
}