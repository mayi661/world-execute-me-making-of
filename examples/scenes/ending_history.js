// The archive and its empty state share a window. Only the user can clear it.
import { composer, sidebar, windowFrame } from '../components/chat.js';
import { cursorAt, pointer, sinceClick } from '../components/cursor.js';
import { spark } from '../components/motif.js';
import { prog, smooth } from '../engine/util.js';
import { cue } from './cues.js';
import { scopeGround } from './echo_signal.js';
import { CHUNKS } from './loop.js';
import { UNANSWERED_MESSAGES } from './unanswered_messages.js';
import { cues } from './shared.js';

const frame = {
  win: {x:76,y:40,w:1768,h:724,r:22},
  side: {x:76,y:40,w:390,h:724},
  drawer: {w:0},
};
const feed = {x:500,y:150,w:1290,h:459};
const input = {x:555,y:644,w:1200,h:88};

function chatWindow(ctx, script, titles, cleared, scroll, recording) {
  windowFrame(ctx,frame,{shadow:0});
  sidebar(ctx,frame,{items:cleared ? [] : titles, active:cleared ? -1 : 0});
  ctx.text('Settings',426,729,{size:22,align:'right',color:'sub'});
  ctx.text('ChatGPT',514,106,{size:39,weight:650,color:'text'});
  ctx.text(cleared ? 'New chat' : (script.title ?? ''),1788,102,{size:24,align:'right',color:'sub'});
  ctx.line(466,132,1842,132,{width:1.5,color:'line'});

  if (!cleared) ctx.clip(feed,() => {
    const top = feed.y-scroll;
    ctx.text('you',1720,top+30,{size:22,weight:600,color:'sub',align:'right'});
    const message = script.left_anchor?.you;
    if (message) {
      const bubbleW = ctx.measure(message,{size:37})+56;
      ctx.rrect(1720-bubbleW,top+45,bubbleW,68,26,{fill:'raised'});
      ctx.text(message,1692,top+91,{size:37,color:'text',align:'right'});
    }

    if (recording) recording(ctx,{x:615,y:top+54,w:548,h:90});
    UNANSWERED_MESSAGES.forEach((chunks,i) => {
      const y=recording ? top+132+59*i : top+149+109*i;
      spark(ctx,583,y+11,19,{color:'meHot'});
      if (recording) {
        ctx.text(script.left_sequence?.[i]?.timestamp ?? '',623,y+17,{font:'mono',size:21,color:'sub'});
        ctx.text(chunks.join(''),854,y+22,{size:40,weight:500,color:'meHot'});
      } else {
        ctx.text('ChatGPT',623,y+18,{size:24,weight:650,color:'sub'});
        ctx.text(script.left_sequence?.[i]?.timestamp ?? '',758,y+17,{font:'mono',size:20,color:'mute'});
        ctx.text(chunks.join(''),623,y+67,{size:42,weight:500,color:'meHot'});
      }
    });
  });
  composer(ctx,input,{placeholder:'',label:'',send:'idle',caret:false});
}

function button(ctx, label, x, y, w, primary) {
  ctx.rrect(x,y,w,60,16,{fill:primary?'errDim':'panel',stroke:primary?'err':'line',width:2});
  ctx.text(label,x+w/2,y+40,{align:'center',weight:600,size:26,color:'text'});
}

function dataControls(ctx) {
  ctx.rrect(536,238,928,336,22,{fill:'panel',stroke:'mute',width:2,shadow:0.7});
  ctx.text('Settings',579,305,{size:42,weight:650,color:'text'});
  ctx.line(538,333,1462,333,{color:'line',width:2});
  ctx.rrect(563,369,227,58,12,{fill:'raised'});
  ctx.text('Data controls',582,408,{size:26,weight:600,color:'text'});
  ctx.line(817,335,817,571,{color:'line',width:2});
  ctx.text('Chat history',861,405,{size:25,color:'sub'});
  ctx.text('Delete all chats',861,485,{size:33,weight:600,color:'text'});
  button(ctx,'Delete all',1224,443,195,true);
}

function confirmation(ctx) {
  ctx.rrect(570,257,840,305,22,{fill:'raised',stroke:'mute',width:2,shadow:0.7});
  ctx.text('Delete all chats?',619,336,{size:50,weight:650,color:'text'});
  ctx.text('This will permanently delete your chat history.',620,396,{size:28,color:'sub'});
  ctx.line(620,436,1360,436,{color:'line',width:1.5});
  button(ctx,'Cancel',972,467,159,false);
  button(ctx,'Delete all',1153,467,207,true);
}

export function historyEnding(env, {recording = null} = {}) {
  const { B, Bt, P, text } = cues(env);
  const titles = [env.script.title,...(env.script.sidebar ?? [])].filter(Boolean);
  const hits = CHUNKS.map((_,i) => cue(`endSyl${i+1}`));
  const open = B(108), ask = B(110), erase = hits[3];
  const way = [
    {t:B(104),x:1556,y:282},
    {t:B(107),x:1480,y:539},
    {t:open,x:402,y:716,click:true},
    {t:open+P,x:402,y:716},
    {t:ask-P/2,x:1352,y:487},
    {t:ask,x:1352,y:487,click:true},
    {t:hits[1],x:1292,y:511},
    {t:erase,x:1292,y:511,click:true},
  ];
  function draw(ctx,t) {
    const cleared = t>=erase;
    ctx.fx.bright=1;
    ctx.fx.zoom=1;
    ctx.fx.glow=0;
    // Freeze the stock together with the archive. The credits below can fade
    // independently while the picture and its grain are already at rest.
    if (cleared) ctx.fx.postFrame=Math.ceil((erase+env.cfg.timing.offset)*60);
    scopeGround(ctx);
    const travel=smooth(prog(t,B(105),B(107)));
    const scroll=recording ? 174*(1-travel) : 344*travel;
    chatWindow(ctx,env.script,titles,cleared,scroll,recording);
    if (t>=open && !cleared) {
      ctx.rrect(frame.win.x,frame.win.y,frame.win.w,frame.win.h,frame.win.r,{fill:'panel',alpha:0.68});
      if (t<ask) dataControls(ctx);
      else confirmation(ctx);
    }
    const [x,y]=cursorAt(way,t,{dwell:0.24,bow:0.047});
    pointer(ctx,x,y,{scale:1.75,down:sinceClick(way,t)<P/4 ? 1 : 0,
      alpha:1-smooth(prog(t,erase+P/3,erase+P))});

    // Both sung lines sit outside the conversation. The credits use this
    // space only after the last syllable has cleared.
    const caption = {font:'serif',size:86,weight:800,align:'center',color:'text'};
    if (t<B(105)) {
      ctx.text(text(127),960,921,{...caption,alpha:1-smooth(prog(t,B(104)+2.5*P,B(104)+3.5*P))});
    } else if (t>=hits[0] && t<B(112)) {
      const i=hits.filter(hit => t>=hit).length-1;
      ctx.text(text(128).slice(0,CHUNKS[i][1]),960,921,
        {...caption,alpha:1-smooth(prog(t,erase+P*0.65,B(112)))});
    }
  }
  return [
    {id:'ending-history',at:B(104),lines:[127,127],palette:'ash',
      layout:'ChatGPT sidebar and a two-sided conversation',
      moment:recording ? 'The user scrolls back from six unanswered sends to her earlier purr and their last reply in the same thread.'
        : 'The last user reply scrolls away. Her unanswered messages are still in the archive.',render:draw},
    {id:'ending-delete',at:B(109),palette:'ash',
      layout:'account settings and the confirmation over the archive',
      moment:'The pointer chooses to delete all conversations and pauses at the confirmation.',render:draw},
    {id:'ending-empty',at:Bt(445),lines:[128,128],palette:'ash',
      layout:'the same sidebar, empty thread and idle composer',
      moment:'On the fourth syllable the user clears both sides of the chat and every title. The empty window holds.',render:draw},
  ];
}
