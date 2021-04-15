import { useEffect, useState } from 'react';

export default function Home() {
  const [version, setVersion] = useState('');
  useEffect(() => {
    async function apply() {
      console.log(
        'await window.myAPI.getVersion()' + (await window.myAPI.getVersion()),
      );
      setVersion(await window.myAPI.getVersion());
    }

    apply();
  }, []);

  return (
    <div>
      <h2>{version}</h2>
    </div>
  );
}
