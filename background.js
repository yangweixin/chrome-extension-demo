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
    case "1": 
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: 'images/get_started16.png',
      title: '这是标题',
      message: '您刚才点击了自定义右键菜单！'
    });
    break;
    case "2": {
      chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(info.selectionText)});
      break;
    }
    
  } 
})

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  console.log('inputChanged: ' + text);
  if(!text) return;
  if(text == '美女') {
      suggest([
          {content: '中国' + text, description: '你要找“中国美女”吗？'},
          {content: '日本' + text, description: '你要找“日本美女”吗？'},
          {content: '泰国' + text, description: '你要找“泰国美女或人妖”吗？'},
          {content: '韩国' + text, description: '你要找“韩国美女”吗？'}
      ]);
  }
  else if(text == '微博') {
      suggest([
          {content: '新浪' + text, description: '新浪' + text},
          {content: '腾讯' + text, description: '腾讯' + text},
          {content: '搜狐' + text, description: '搜索' + text},
      ]);
  }
  else {
      suggest([
          {content: '百度搜索 ' + text, description: '百度搜索 ' + text},
          {content: '谷歌搜索 ' + text, description: '谷歌搜索 ' + text},
      ]);
  }
});
// 当用户接收关键字建议时触发
chrome.omnibox.onInputEntered.addListener((text) => {
  console.log('inputEntered: ' + text);
  if(!text) return;
  var href = '';
  if(text.endsWith('美女')) href = 'http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=' + text;
  else if(text.startsWith('百度搜索')) href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text.replace('百度搜索 ', '');
  else if(text.startsWith('谷歌搜索')) href = 'https://www.google.com.tw/search?q=' + text.replace('谷歌搜索 ', '');
  else href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text;
  openUrlCurrentTab(href);
});
// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}

// 当前标签打开某个链接
function openUrlCurrentTab(url)
{
    getCurrentTabId(tabId => {
        chrome.tabs.update(tabId, {url: url});
    })
}
