const C="onda-v1",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==location.origin)return;
 if(r.mode==="navigate"){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(C).then(h=>h.put("index.html",c));return x}).catch(()=>caches.match("index.html")));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{const c=x.clone();caches.open(C).then(h=>h.put(r,c));return x})))});
