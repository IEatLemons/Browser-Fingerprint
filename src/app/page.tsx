'use client';

export default function Home() {
  const handleClick = async () => {
    const fingerprint = await getFingerprint();
    console.log('fingerprint', fingerprint);
    const res = await fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fingerprint),
    });
    console.log('res', res);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <button onClick={handleClick}>get Fingerprint</button>
      </div>
    </main>
  );
}


const getFingerprint = async () => {
  const fingerprint: any = {};

  // 获取HTTP Headers信息
  fingerprint.userAgent = navigator.userAgent;
  fingerprint.language = navigator.language;
  fingerprint.platform = navigator.platform;

  // 获取屏幕分辨率和颜色深度
  fingerprint.screenResolution = `${window.screen.width}x${window.screen.height}`;
  fingerprint.colorDepth = window.screen.colorDepth;

  // 获取时区和语言设置
  fingerprint.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // 获取Canvas指纹
  const canvas = document.createElement('canvas');
  const ctx:any = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#f60';
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = '#069';
  ctx.fillText('Browser Fingerprint', 2, 15);
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
  ctx.fillText('Browser Fingerprint', 4, 17);
  fingerprint.canvas = canvas.toDataURL();

  // 获取WebGL指纹
  // const gl:any = canvas.getContext('webgl');
  // const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  // fingerprint.webglVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
  // fingerprint.webglRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

  return fingerprint;
};