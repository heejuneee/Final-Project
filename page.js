const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});


router.get('/join2', (req, res) => {
  res.render('join2', { title: 'SYT - 온라인 오디션플랫폼' });
});

router.get('/auca',(req, res) => {
  res.render('auca', { title: 'SYT - 온라인 오디션플랫폼' });
});


router.get('/Newlogin', (req, res) => {
  res.render('Newlogin', { title: 'SYT - 온라인 오디션플랫폼' });
});

router.get('/mypage',  (req, res) => {
  res.render('mypage', { title: 'SYT - 온라인 오디션플랫폼' });
});

router.get('/join',  (req, res) => {
  res.render('join', { title: 'SYT - 온라인 오디션플랫폼' });
});

router.get('/layout', (req, res)=>{
  res.render('layout',{title: 'SYT - 온라인 오디션플랫폼'});
});

router.get('/search', (req, res)=>{
  res.render('search',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/portfolio', (req, res)=>{
  res.render('portfolio',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/pinfo', (req, res)=>{
  res.render('pinfo',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/noinfo', (req, res)=>{
  res.render('noinfo',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/fallow', (req, res)=>{
  res.render('fallow',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/mypageau', (req, res)=>{
  res.render('mypageau',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/like', (req, res)=>{
  res.render('like',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/mypageinfo', (req, res)=>{
  res.render('mypageinfo',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/mypagema', (req, res)=>{
  res.render('mypagema',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/outauca', (req, res)=>{
  res.render('outauca',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/brbr', (req, res)=>{
  res.render('brbr',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/oucaal', (req, res)=>{
  res.render('oucaal',{title: 'SYT - 온라인 오디션플랫폼'});
});
router.get('/zongjang', (req, res)=>{
  res.render('zongjang',{title: 'SYT - 온라인 오디션플랫폼'});
});




router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.render('main', {
      title: 'SYT - 온라인 오디션플랫폼',
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render('main', {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
