import { useState, useEffect } from 'react'
import { getIp } from 'lib/currentIp';

function CurrentIp() {
  const [ip, setIP] = useState('');

  const getData = async () => {
    setIP(await getIp());
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <h2>Your IP Address is: {ip}</h2>
    </div>
  );
}

export default CurrentIp;