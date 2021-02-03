const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser());
const authRoutes = require('./routes/authRoutes')
const graphQLRoutes = require('./routes/graphQLRoutes')


app.use(cors())
app.use(graphQLRoutes)
app.use(authRoutes)

// const {PhotoFolder,Photo} = require('./models/photoGallery/PhotoFolder')
// app.get('/photo',async(req,res)=>{
//   let photo = new Photo({photoLink:'testlink'})
//   let folder = new PhotoFolder({title:'testtitle2', photos:[photo]})
//   try {
//     await folder.save()
//     res.send('work')
//   } catch (error) {
//     res.send(error)
//   }
  
// })

// app.get('/gallery',async(req,res)=>{
//   res.json(await PhotoFolder.find({}))
  
// })

// app.get('/addphoto',async(req,res)=>{
//   const folderid = "60198d887561cb09ec4eb732"
//   const photo = new Photo({title:"phototitle",photoLink:"hey",description:""})
//   const folder = await PhotoFolder.updateOne({_id:folderid},{$push:
//       {photos:photo}
//   })
//   if(folder.nModified) return res.json (photo)
//   res.json(folder)
// })

// app.get('/modifyPhoto',async(req,res)=>{
//   const folderid = "601ad33c8b494531788657fa"
//   // const photo = new Photo({title:"phototitle",photoLink:"hey",description:""})
//   const photoId = '601ad3518b494531788657fb'
//   try {
//     const folder = await PhotoFolder.findOne({_id:folderid})
//   const index =folder.photos.findIndex(photo=> photo.id === photoId)
//   folder.photos[index].photoLink='https://images.squarespace-cdn.com/content/v1/59d6b903f7e0ab75856a1808/1525827983053-LPN9L6TJLZ6HH17ZSTJG/ke17ZwdGBToddI8pDm48kNu93_l1Rc0JoXikXAEKHf17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmDJyaVitQ06bkWUY0OMxkmN-bdz7wg8la12Me-ub45vBE5029s6uMXtkNCzVgxK8m/bali-fashion-photographer_010.jpg?format=500w'
//   await folder.save()
//   res.json(folder)
//   } catch (error) {
//     res.json(error)
//   }
  
// })

const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://jiachen.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

//https://github.com/Automattic/mongoose/issues/8811   https://github.com/Automattic/mongoose/issues/8832
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => { console.log('connected to DB') })
  .catch((err) => console.log(err));

const port = process.env.PORT
app.listen(port, () => {
  console.log('serving port ' + process.env.PORT);

})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  })
}