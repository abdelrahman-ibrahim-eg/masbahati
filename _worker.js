// Masbahati share counter. Cloudflare Pages advanced mode (_worker.js) + one D1 database bound as DB.
// Stores only random anonymous ids. No names, numbers, locations. IPs are never stored (only a salted daily hash for rate limiting).
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{'content-type':'application/json','cache-control':'no-store'}});
const REF=/^[a-z0-9]{8}$/,ID=/^[a-z0-9]{16}$/,LIMIT_PER_IP_DAY=60;
let ready=null;
function init(db){return ready||(ready=db.batch([
 db.prepare('CREATE TABLE IF NOT EXISTS joins(id TEXT PRIMARY KEY, ref TEXT NOT NULL, ts INTEGER NOT NULL)'),
 db.prepare('CREATE INDEX IF NOT EXISTS joins_ref ON joins(ref)'),
 db.prepare('CREATE TABLE IF NOT EXISTS ipday(h TEXT NOT NULL, day TEXT NOT NULL, n INTEGER NOT NULL, PRIMARY KEY(h,day))')]).catch(e=>{ready=null;throw e}))}
async function sha(t){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return [...new Uint8Array(b)].slice(0,12).map(x=>x.toString(16).padStart(2,'0')).join('')}
async function api(request,env,url){
 if(!env.DB)return J({ok:false},503);
 try{await init(env.DB);
  if(url.pathname==='/api/count'&&request.method==='GET'){const c=url.searchParams.get('code')||'';if(!REF.test(c))return J({ok:false},400);
   const r=await env.DB.prepare('SELECT COUNT(*) AS n FROM joins WHERE ref=?').bind(c).first();return J({ok:true,n:r?r.n:0})}
  if(url.pathname==='/api/join'&&request.method==='POST'){let b;try{b=await request.json()}catch(e){return J({ok:false},400)}
   if(!b||!REF.test(b.ref||'')||!ID.test(b.id||''))return J({ok:false},400);
   const day=new Date().toISOString().slice(0,10),h=await sha((request.headers.get('cf-connecting-ip')||'x')+'|'+day+'|masbahati');
   const u=await env.DB.prepare('SELECT n FROM ipday WHERE h=? AND day=?').bind(h,day).first();
   if(u&&u.n>=LIMIT_PER_IP_DAY)return J({ok:true,counted:false});
   const ins=await env.DB.prepare('INSERT OR IGNORE INTO joins(id,ref,ts) VALUES(?,?,?)').bind(b.id,b.ref,Date.now()).run();
   const added=ins.meta&&ins.meta.changes>0;
   if(added){await env.DB.prepare('INSERT INTO ipday(h,day,n) VALUES(?,?,1) ON CONFLICT(h,day) DO UPDATE SET n=n+1').bind(h,day).run();
    if(Math.random()<0.02)await env.DB.prepare('DELETE FROM ipday WHERE day<?').bind(day).run()}
   return J({ok:true,counted:!!added})}
  return J({ok:false},404)
 }catch(e){return J({ok:false},503)}}
export default{async fetch(request,env){const url=new URL(request.url);if(url.pathname.startsWith('/api/'))return api(request,env,url);return env.ASSETS.fetch(request)}};
