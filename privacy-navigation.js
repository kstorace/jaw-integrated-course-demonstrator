// Privacy is a transient informational detour. No domain commands or persistence.
const areas=['evidence','profile','vacancies','applications','tracker'];
export function supportedWorkflowHash(hash){
 if(typeof hash!=='string'||!/^#[a-z]+(?:\/[A-Za-z0-9._-]+){0,2}$/.test(hash))return false;
 const [area,id,section]=hash.slice(1).split('/');
 return areas.includes(area)&&(!section||(['applications','tracker'].includes(area)&&id.startsWith('APP-')));
}
let previous=null,armed=null,lastMainFocus=null,pending=location.hash==='#privacy'?'privacy':null,contextIdentity=()=>null;
const describe=e=>e?{id:e.id,name:e.name,value:e.value,tag:e.tagName,text:e.textContent?.slice(0,200)}:null;
const sectionFor=hash=>{const parts=hash.slice(1).split('/');return ['applications','tracker'].includes(parts[0])?parts[2]||(!parts[1]?.startsWith('APP-')?parts[1]:null):parts[1];};
const headingIn=el=>el?.matches('h1,h2,h3,h4')?el:el?.querySelector('h1,h2,h3,h4');
function capture(hash=location.hash||'#evidence'){
 if(!supportedWorkflowHash(hash))return null;
 const token=contextIdentity(hash),routeSection=sectionFor(hash),main=document.querySelector('#main');
 if(!token||(routeSection&&!main?.contains(document.getElementById(routeSection))))return null;
 const selected=[...document.querySelectorAll('.local-nav a[aria-current="location"]')].find(a=>a.hash.startsWith('#'+hash.slice(1).split('/')[0]+'/'));
 const section=routeSection||(selected?sectionFor(selected.hash):null);
 return {hash,token,scroll:scrollY,focus:lastMainFocus,section,heading:describe(headingIn(section&&document.getElementById(section))||main?.querySelector('h1'))};
}
function validContext(){return previous&&supportedWorkflowHash(previous.hash)&&contextIdentity(previous.hash)===previous.token;}
function findFocus(f){return f&&[...document.querySelectorAll('#main [id],#main input,#main select,#main textarea,#main summary,#main h1,#main h2,#main h3,#main h4')].find(e=>f.id?e.id===f.id:f.name?e.name===f.name&&e.value===f.value:e.tagName===f.tag&&e.textContent?.slice(0,200)===f.text);}
function focus(target){if(!target)return;if(!target.matches('a[href],button,input,select,textarea,summary,[tabindex]'))target.tabIndex=-1;target.focus({preventScroll:true});}
function restore(explicit){
 const section=previous.section&&document.getElementById(previous.section);
 const target=explicit?(headingIn(section)||findFocus(previous.heading)||findFocus(previous.focus)||document.querySelector('#main h1')):(findFocus(previous.focus)||headingIn(section)||document.querySelector('#main h1'));
 focus(target);window.scrollTo({top:previous.scroll,behavior:'instant'});
}
// Capture before a deliberate link closes the drawer; hash entry also refreshes from the live workflow.
document.addEventListener('click',event=>{if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const a=event.target.closest?.('a[href="#privacy"]');if(a&&location.hash!=='#privacy')armed=capture();},true);
document.addEventListener('focusin',e=>{if(e.target.closest?.('#main')&&location.hash!=='#privacy')lastMainFocus=describe(e.target);},true);
export const privacyNavigation={
 configure(inspect){contextIdentity=inspect;},
 target:()=>validContext()?previous.hash:null,
 change(event,captureView){const oldHash=new URL(event.oldURL).hash||'#evidence',next=location.hash;
  if(next==='#privacy'){
   // Refresh from this visit's live origin, including Back/Forward entry.
   previous=armed?.hash===oldHash?armed:capture(oldHash);
   if(previous)captureView();
   armed=null;pending='privacy';return true;
  }
  if(oldHash==='#privacy')pending=validContext()&&previous.hash===next?'return':'destination';return false;
 },
 mounted(onReturn){
  if(location.hash==='#privacy'){
   document.title='Privacy & AI use – JAW';focus(document.getElementById('privacy-heading'));window.scrollTo({top:0,behavior:'instant'});pending=null;
   const link=document.querySelector('[data-privacy-return]');if(link)link.addEventListener('click',event=>{
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();const target=this.target();if(!target){link.remove();return;}
    pending='explicit-return';history.replaceState(history.state,'',target);onReturn();
   });return;
  }
  document.title='JAW · Your next chapter';if(!pending)return;
  if(['return','explicit-return'].includes(pending)&&validContext())restore(pending==='explicit-return');
  else {focus(document.querySelector('#main h1'));window.scrollTo({top:0,behavior:'instant'});}
  if(pending==='explicit-return')previous=null;
  pending=null;
 },
 clear(){previous=null;armed=null;lastMainFocus=null;pending=null;}
};
