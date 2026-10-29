// Reset-only completion boundary. Shared dispatch and the RESET reducer are unchanged.
export function performReset({previous,reduce,fixtures,storage,key,install,complete}){
 let next,encoded;try{next=reduce(previous,{type:'RESET'},fixtures);encoded=JSON.stringify(next);}catch{return {status:'not-persisted'};}
 try{storage.setItem(key,encoded);}catch{
  try{if(storage.getItem(key)!==encoded)return {status:'not-persisted'};}catch{return {status:'unknown'};}
  try{install(next);}catch{}return {status:'persisted-incomplete'};
 }
 try{install(next);complete();return {status:'complete'};}catch{return {status:'persisted-incomplete'};}
}
