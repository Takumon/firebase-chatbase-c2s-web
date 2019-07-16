export function connect(sb: any, userId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if(!sb) {
      reject(`Incollect argument. sb is required.`);
    }
    if(!userId) {
      reject(`Incollect argument. userId is required.`);
    }

    sb.connect(userId, (user: any, error: any) => {
      error
        ? reject(error)
        : resolve(user);
    });
  });
}

export function openChannel(sb: any, channelId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if(!sb) {
      reject(`Incollect argument. sb is required.`);
    }
    if(!channelId) {
      reject(`Incollect argument. channelId is required.`);
    }

    sb.OpenChannel.getChannel(channelId, (openedChannel: any, error: any) => {
      error
          ? reject(error)
          : resolve(openedChannel);
    });
  });
}

export function enterChannel(channel: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!channel) {
      reject(`Incollect argument. channel is required.`);
    }

    channel.enter((response: any, error: any) => {
      error
        ? reject(error)
        : resolve('OK!');
    });
  });
}

export function sendMessage(channel: any, message: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if(!channel) {
      reject(`Incollect argument. channel is required.`);
    }

    if(!message) {
      reject(`Incollect argument. message is required.`);
    }

    console.log('XXXXXXXXXXXX', message)
    channel.sendUserMessage(message, (msg: any, error: any) => {
      error
        ? reject(error)
        : resolve(msg);
    });
  });
}

export function sendFileMessage(channel: any, file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if(!channel) {
      reject(`Incollect argument. channel is required.`);
    }

    if(!file) {
      reject(`Incollect argument. file is required.`);
    }

    console.log('XXXXXXXXXXXX', file)
    channel.sendFileMessage(file, (msg: any, error: any) => {
      error
        ? reject(error)
        : resolve(msg);
    });
  });
}

export function updateMessage(channel: any, message: any, messageText: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if(!channel) {
      reject(`Incollect argument. channel is required.`);
    }

    if(!message) {
      reject(`Incollect argument. message is required.`);
    }

    if(!messageText) {
      reject(`Incollect argument. messageText is required.`);
    }

    channel.updateUserMessage(
      message.messageId,
      messageText,
      message.data,
      message.customType,
      (msg: any, error: any) => {
        error
          ? reject(error)
          : resolve(msg);
      }
    );
  });
}

export function deleteMessage(channel: any, message: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if(!channel) {
      reject(`Incollect argument. channel is required.`);
    }

    if(!message) {
      reject(`Incollect argument. message is required.`);
    }

    channel.deleteMessage(Object.assign({}, message), (res: any, error: any) => {
      error
        ? reject(error)
        : resolve('OK');
    });
  });
}

export function getMessage(query: any): Promise<[string] | [] | string> {
  return new Promise((resolve, reject) => {
    if(!query) {
    reject(`Incollect argument. query is required.`);
    }

    if (query.hasMore && !query.isLoading) {
      query.load(50, false, (messageList: any, error: any) => {
        error
          ? reject(error)
          : resolve(messageList);
      });
    } else {
      resolve([]);
    }
  });
}
