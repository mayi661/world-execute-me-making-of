from pathlib import Path
import os,re,sys,json,subprocess
from compare import root,work,ref,ff,grab
sys.path.insert(0,str(root/'.probe/char_redraw_qa'))
from film_build import picture_table
final=root/'out/world_execute_me_signal_fold_4k60.mp4'
def mux(raw,dst,with_audio=True):
    sources=['-f','h264','-r','60','-i',raw]
    maps=['-map','0:v:0']
    if with_audio:
        sources+=['-i',ref]
        maps+=['-map','1:a:0','-map_metadata','1']
    filters='h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0:tick_rate=120/1'
    filters+=',setts=pts=N*256:dts=N*256:duration=256:time_base=1/15360'
    cmd=[ff,'-hide_banner','-nostdin','-v','error','-y',*sources,*maps,'-c','copy','-bsf:v',filters,
         '-video_track_timescale','15360','-color_primaries','bt709','-colorspace','bt709','-color_trc','bt709',
         '-color_range','tv','-movflags','+faststart',dst]
    subprocess.run(list(map(str,cmd)),check=True)
def audio_hash(file):
    return grab('-i',file,'-map','0:a:0','-c:a','copy','-f','hash','-hash','sha256','-').decode().strip()
def streams(file):
    txt=subprocess.run([str(ff),'-hide_banner','-i',str(file)],stdout=subprocess.PIPE,stderr=subprocess.STDOUT).stdout.decode('utf8','replace')
    return [s.strip() for s in txt.splitlines() if 'Stream #' in s or 'Duration:' in s]
if __name__=='__main__':
    if len(sys.argv)>1:
        mux(work/'codec_probe.h264',work/'probe_clock.mp4',False)
        probe=work/'probe_clock.mp4'
        print('probe stream',streams(probe),picture_table(probe)[0])
    else:
        candidate=work/'verified_mux.mp4'
        mux(work/'final_picture.h264',candidate)
        n,keys,clock=picture_table(candidate)
        assert (n,clock)==(13014,15360) and audio_hash(candidate)==audio_hash(ref)
        description=streams(candidate);print('movie',description)
        assert any('3840x2160' in s and '60 fps' in s for s in description) and any('Audio: aac' in s for s in description)
        os.replace(candidate,final)
        print('CFR frames',n,'video bytes',final.stat().st_size,'AAC',audio_hash(final))
