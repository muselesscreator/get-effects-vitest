import React from 'react';
import { StrictDict } from '@muselesscreator/strict-dict';

export const stateKeys = StrictDict({
  importedClicked: 'importedClicked',
  fileInputChanged: 'fileInputChanged',
  loaded: 'loaded',
  numEvents: 'numEvents',
});

export const formUrl = 'localhost:18000/form-url';

export const useExampleComponentData = ({
  val1,
  cb1,
  val2,
  cb2,
}) => {
  React.useEffect(() => { cb1(val1); }, [cb1, val1]);
  React.useEffect(() => { cb2(num => val2 + num); }, [cb2, val2]);
};

export default useExampleComponentData;
