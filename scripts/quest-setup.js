const { initSetup, send, getArgv } = require('./utils');
const argv = getArgv('wallet_name', 'contractTxId');

const schemas = {
  type: 'object',
  required: [
    'title',
    'created_at_unix_timestamp',
    'user_address',
    'status',
    'description',
    'total_participants',
    'reward_token_address',
    'reward_amount_or_tokenId',
    'start_unix_timestamp',
    'end_unix_timestamp',
  ],
  properties: {
    title: {
      type: 'string',
    },
    user_address: {
      type: 'string',
    },
    created_at_unix_timestamp: {
      type: 'number',
    },
    status: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    deadline_at_unix_timestamp: {
      type: 'number',
    },
    total_participants: {
      type: 'number',
    },
    reward_token_address: {
      type: 'string',
    },
    reward_amount_or_tokenId: {
      type: 'number',
    },
    start_unix_timestamp: {
      type: 'number',
    },
    end_unix_timestamp: {
      type: 'number',
    },
  },
};

const rules = {
  'allow create': {
    and: [
      {
        '==': [
          { var: 'request.auth.signer' },
          { var: 'resource.newData.user_address' },
        ],
      },
      {
        '==': [
          { var: 'request.block.timestamp' },
          { var: 'resource.newData.created_at_unix_timestamp' },
        ],
      },
      {
        '==': [{ var: 'resource.newData.status' }, 'open'],
      },
    ],
  },
  'allow update': {
    and: [
      {
        '==': [
          { var: 'request.auth.signer' },
          { var: 'resource.newData.user_address' },
        ],
      },
      {
        '==': [{ var: 'resource.newData.status' }, 'completed'],
      },
    ],
  },
};
const setup = async () => {
  const { sdk, wallet, addr } = await initSetup(argv);

  await send(sdk, wallet, [
    {
      func: 'setSchema',
      query: [schemas, 'quest'],
      msg: 'quest schema set!',
    },
    { func: 'setRules', query: [rules, 'quest'], msg: 'quest rules set!' },
  ]);
  process.exit();
};

setup();
