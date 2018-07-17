import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import {createMetaFields} from '../common/MetaFields'
import {getCurrentLanguageByPath, hasContent} from '../common/DDUtil'
import express from 'express'
import compression from 'compression'
import Routes from '../components/Router'
import CaasHelper from '../caas/CaasHelper'
import config from '../config'

var MemJS = require('memjs').Client
var memjs = MemJS.create()
var additionalProps = null
var gaProperty = null

var PORT = process.env.PORT || 8000

var app = express()
app.use(compression())
app.use('/build', express.static('dist/build'))
app.use('/static', express.static('dist/static'))
app.use('/', express.static('dist/favicon'))
app.get('*', (req, res) => {
  match({routes: Routes, location: req.url}, (err, redirect, props) => {

    if (err) {
      res.status(500).send(err.message)
    }
    else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    }
    else if (props) {
      // Check Language
      // if (req.path === '/purgecache') {
      //   memjs.flush()
      // }
      const currentLanguage = getCurrentLanguageByPath(req.path)

      if (currentLanguage === 'unknown') {
        //If no valid lang is specified, forward to an accepted language
        const lang = req.acceptsLanguages('de', 'fr')
        res.redirect('/' + lang)
        return
      }
      // if (/^\/de[\/]{0,1}$/.test(req.path)) {
      //   res.redirect(req.path)
      //   return
      // }

      if (isPageCacheEnabled(req)) {
        // enable page cache for production
        memjs.get('page_' + req.get('host') + req.path, function (err, value) {
          if (value) {
            res.send(value.toString())
          }
          else {
            fetchPage(res, req, props, currentLanguage)
          }
        })
      }
      else {
        fetchPage(res, req, props, currentLanguage)
      }

    }
    else {
      res.status(404).send('Not Found')
    }
  })
})
app.listen(PORT, function () {
  console.log('Express server running at localhost:' + PORT)
})

// function cachePage(req, html) {
//   if (isPageCacheEnabled(req)) {
//     memjs.set('page_' + req.get('host') + req.path, html, (err) => {
//       if (err) {
//         console.error(err)
//       }
//     }, config.pageCacheExpirySeconds)
//   }
// }

function fetchPage(res, req, props, currentLanguage) {
  memjs.get('basedata', function (err, value) {
    const caasHelper = new CaasHelper()
    if (value) {
      // caasHelper.setCached(req.path, JSON.parse(value.toString()), (additionalProps) => {
        const html = renderPage(props, additionalProps, currentLanguage, req, gaProperty)
        res.send(html)
        // cachePage(req, html)
      // })
    }
    else {
      // caasHelper.fetchAll(req.path, (additionalProps) => {
        const html = renderPage(props, additionalProps, currentLanguage, req, gaProperty)
        res.send(html)
        var cache = {
          // config: additionalProps.config,
          navigationTree: additionalProps.navigationTree
        }
        memjs.set('basedata', JSON.stringify(cache), (err) => {
          if (err) {
            console.error(err)
          }
        })
        // cachePage(req, html)
      // })
    }
  })
}

// function isPageCacheEnabled(req) {
//   if (hasContent(config.pageCachedDomains) && req) {
//     return new RegExp(config.pageCachedDomains.join('|')).test(req.hostname)
//   }
//   return false
// }

function renderPage(renderProps, setting, currentLanguage, req, gaPropertyId) {
  // renderProps.params = Object.assign(renderProps.params, {appState: setting})
  const all = Object.assign(renderProps, setting)
  const appHtml = renderToString(<RouterContext {...all}/>)
  const metaFields = createMetaFields(setting)
  const base = '//' + req.get('host')
  const bundleJs = base + '/build/bundle.js'
  const css = base + '/build/main.css'
  const ogUrl = base + req.path
  let gaSnippet = ''
  if (hasContent(gaPropertyId)) {
    gaSnippet = `    
    <!-- Google Analytics -->
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-101928317-1', 'auto');
    ga('send', 'pageview');
    </script>
    <!-- End Google Analytics -->`
  }

  const ascii = `
      <!-- 
                           &                                                                          
                         &&                                                                           
                       &&                                                                             
                     &&&                                                                               
              @& &@ &&&                                                                                 
            @&&& &&&@                                                                                  
          @&&&&& &&&&&@                                                                                
        @&&&&&&& &&&&&&&@                                                                              
      @&&&&&&&&&                 @&   &&  @&&&&@    @&&& @&&&@ @&&&@   @&&&&@         &&& &    @&  @&&&@ 
    @&&&&&&&&&&&                 && &&&  &&    && @&&   &&   &&&   && &&    &&      &&&   &    && &&   &&
    &&&&&&&&&&&&                 &&&&   &&      & &&    &    &&    && &      &&     &     &    && &&    &
      &&&&&&&&&&                 && &&&  &&@  @&& &&    &    &&    && &&@  @&&&     &     &&   && &&    &
        &&&&&&&&                 &&   &&   &&&& & &&    &    &&    &&   &&&& &&& &  &      &&&&   &&    &
          &&&&&&                                                                                       
            &&&&                                                                                       
              &&                                                                                       
    -->`

  const markup = `
    <html lang="${currentLanguage}">
    ${ascii}
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <base href="${base}/">
    <!-- req.protocol ${req.protocol} -->
    <title>we.publish</title>
    <meta name="description" content="we.publish">
    <meta name="keywords" content="we.publish">
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="theme-color" content="#ffffff">
    <!-- Open graph -->
    <meta property="og:url" content="${ogUrl}" />
    <meta property="og:description" content="we.publish"/>
    <meta property="og:title" content="we.publish"/>
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="we.publish"/>
    <meta property="og:image" content="https://karmarun-res.cloudinary.com/image/upload/v1531816694/wepublish/We.Publish--Logo--RGB--pos.png"/>
    <meta property="og:image:secure_url" content="https://karmarun-res.cloudinary.com/image/upload/v1531816694/wepublish/We.Publish--Logo--RGB--pos.png" />
    <meta property="og:image:type" content="png" />
    <meta property="og:image:width" content="866" />
    <meta property="og:image:height" content="120" />
    <!-- Twitter summary card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@karma" />
    <meta name="twitter:title" content="we.publish" />
    <meta name="twitter:description" content="we.publish" />
    <meta name="twitter:image:src" content="https://karmarun-res.cloudinary.com/image/upload/v1531816694/wepublish/We.Publish--Logo--RGB--pos.png" />
    <!-- Mobile viewport optimization -->
	  <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">
	  <!-- React State -->
    <script>var APP_PROPS=${JSON.stringify(setting)}</script>
    <!-- Styles -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/Swiper/3.1.5/css/swiper.min.css"/>
    <link rel="stylesheet" href="${css}"/>
    </head>
    <body>
    <div id="app-wrapper">${appHtml}</div>
    <script src="${bundleJs}" defer="true"></script>
    ${gaSnippet}
    </body>
    </html>
   `
  return "<!doctype html>" + markup
}