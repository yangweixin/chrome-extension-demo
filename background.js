// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.contextMenus.create({
  id: "1",
  title: "young",
  documentUrlPatterns: ["https://*.baidu.com/**"]
})

chrome.contextMenus.create({
  id: "2",
  title: '使用度娘搜索：%s', // %s表示选中的文字
  contexts: ['selection'] // 只有当选中文字时才会出现此右键菜单
});

chrome.contextMenus.onClicked.addListener(function( info, tab) {
  switch (info.menuItemId) {
    case "1": alert("young extension.");break;
    case "2": {
      chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(info.selectionText)});
      break;
    }
    
  } 
})
