import React, { useState, useEffect } from 'react';
import './App.css';

interface Queue {
  queueId: string;
  name: string;
  currentArrivingGroupStart: number;
  currentArrivingGroupEnd: number;
  state: string;
  type: string;
  postedWaitTime: any; //Unknown
  postedWaitTimeTts: any; //Unknown
  postedInQueueWaitTime: any; //Unknown
  postedInQueueWaitTimeTts: any; //Unknown
  postedQueueStatus: string;
  showQueueProgress: boolean;
  showPostedWaitTimeOnHub: boolean;
  showPostedWaitTimeOnConfirmation: boolean;
  externalDefinitionId: string;
  legalDisclaimer: {
    showOnIntro: boolean;
    showOnConfirmation: boolean;
    showOnMyLines: boolean;
    disclaimerText: string;
  };
  postedSummonReturnWindowMinutes: number;
}

const App: React.FC = () => {
  const initialQueueState: Queue[] = [];
  const [queues, updateQueues] = useState(initialQueueState);

  const fetchQueues = async () => {
    const baseUrl: string =
      process.env.REACT_APP_API_URL || 'http://localhost:4000/';
    const dlrQueuesUrl: string = `${baseUrl}dlrQueues`;
    const wdwQueuesUrl: string = `${baseUrl}wdwQueues`;

    const wdwResponse = await fetch(wdwQueuesUrl);
    const wdwResponseJson = await wdwResponse.json();
    const wdwQueues: Queue[] = wdwResponseJson.queues;

    const dlrResponse = await fetch(dlrQueuesUrl);
    const dlrResponseJson = await dlrResponse.json();
    const dlrQueues: Queue[] = dlrResponseJson.queues;

    updateQueues([...wdwQueues, ...dlrQueues]);
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  return (
    <div className='card'>
      {queues.map((queue: Queue) => (
        <div className='container' key={queue.queueId}>
          <h1 className='display-6'>{queue.name}</h1>
          <div>
            <h4>Now Boarding:</h4>
            <h2>
              Groups {queue.currentArrivingGroupStart} -{' '}
              {queue.currentArrivingGroupEnd}
            </h2>
          </div>
          <p>
            <b>Queue Status:</b> {queue.postedQueueStatus}
          </p>
          <p>
            <b>Disclaimer:</b> {queue.legalDisclaimer.disclaimerText}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
