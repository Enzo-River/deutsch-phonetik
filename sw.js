/* 德语语音综合练习 · Service Worker
   策略：有缓存先用缓存（秒开），同时后台拉新并更新缓存；离线时回退缓存。 */
var CACHE = "de-phonetik-v3";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      // 逐个加入，单个资源失败不影响整体安装
      return Promise.all(ASSETS.map(function(u){
        return c.add(u).catch(function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; })
        .map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  var url;
  try { url = new URL(e.request.url); } catch(err){ return; }
  if(url.origin !== location.origin) return;

  e.respondWith(
    caches.open(CACHE).then(function(cache){
      return cache.match(e.request).then(function(cached){
        var network = fetch(e.request).then(function(res){
          if(res && res.status === 200 && res.type === "basic"){
            cache.put(e.request, res.clone()).catch(function(){});
          }
          return res;
        }).catch(function(){ return cached; });
        return cached || network;
      });
    })
  );
});
