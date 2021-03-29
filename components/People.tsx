import React from 'react';
import useStore from '../lib/useStore.ts'

export default function People() {
  const people = useStore((state: any) => state.people);

  return (
    <div>
      <p>Test</p>
      <p>We have { people.length } people in our DB </p>
      <ul>
        {people.map((p: any) => <li key='{p}'>{p}</li>)}
      </ul>
    </div>
  )
}