"use strict";
var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();
goog.exportSymbol('proto.AccountGasLimit', null, global);
goog.exportSymbol('proto.Block', null, global);
goog.exportSymbol('proto.BlockBody', null, global);
goog.exportSymbol('proto.BlockHeader', null, global);
goog.exportSymbol('proto.BlockTxs', null, global);
goog.exportSymbol('proto.BlockWithProof', null, global);
goog.exportSymbol('proto.Crypto', null, global);
goog.exportSymbol('proto.Proof', null, global);
goog.exportSymbol('proto.ProofType', null, global);
goog.exportSymbol('proto.RichStatus', null, global);
goog.exportSymbol('proto.SignedTransaction', null, global);
goog.exportSymbol('proto.Status', null, global);
goog.exportSymbol('proto.Transaction', null, global);
goog.exportSymbol('proto.UnverifiedTransaction', null, global);
proto.Proof = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Proof, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.Proof.displayName = 'proto.Proof';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.Proof.prototype.toObject = function (opt_includeInstance) {
        return proto.Proof.toObject(opt_includeInstance, this);
    };
    proto.Proof.toObject = function (includeInstance, msg) {
        var f, obj = {
            content: msg.getContent_asB64(),
            type: jspb.Message.getFieldWithDefault(msg, 2, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.Proof.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.Proof;
    return proto.Proof.deserializeBinaryFromReader(msg, reader);
};
proto.Proof.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = (reader.readBytes());
                msg.setContent(value);
                break;
            case 2:
                var value = (reader.readEnum());
                msg.setType(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.Proof.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.Proof.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.Proof.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getContent_asU8();
    if (f.length > 0) {
        writer.writeBytes(1, f);
    }
    f = message.getType();
    if (f !== 0.0) {
        writer.writeEnum(2, f);
    }
};
proto.Proof.prototype.getContent = function () {
    return (jspb.Message.getFieldWithDefault(this, 1, ""));
};
proto.Proof.prototype.getContent_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getContent()));
};
proto.Proof.prototype.getContent_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getContent()));
};
proto.Proof.prototype.setContent = function (value) {
    jspb.Message.setProto3BytesField(this, 1, value);
};
proto.Proof.prototype.getType = function () {
    return (jspb.Message.getFieldWithDefault(this, 2, 0));
};
proto.Proof.prototype.setType = function (value) {
    jspb.Message.setProto3EnumField(this, 2, value);
};
proto.BlockHeader = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.BlockHeader, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.BlockHeader.displayName = 'proto.BlockHeader';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.BlockHeader.prototype.toObject = function (opt_includeInstance) {
        return proto.BlockHeader.toObject(opt_includeInstance, this);
    };
    proto.BlockHeader.toObject = function (includeInstance, msg) {
        var f, obj = {
            prevhash: msg.getPrevhash_asB64(),
            timestamp: jspb.Message.getFieldWithDefault(msg, 2, 0),
            height: jspb.Message.getFieldWithDefault(msg, 3, 0),
            stateRoot: msg.getStateRoot_asB64(),
            transactionsRoot: msg.getTransactionsRoot_asB64(),
            receiptsRoot: msg.getReceiptsRoot_asB64(),
            gasUsed: jspb.Message.getFieldWithDefault(msg, 7, 0),
            gasLimit: jspb.Message.getFieldWithDefault(msg, 8, 0),
            proof: (f = msg.getProof()) && proto.Proof.toObject(includeInstance, f),
            proposer: msg.getProposer_asB64()
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.BlockHeader.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.BlockHeader;
    return proto.BlockHeader.deserializeBinaryFromReader(msg, reader);
};
proto.BlockHeader.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = (reader.readBytes());
                msg.setPrevhash(value);
                break;
            case 2:
                var value = (reader.readUint64());
                msg.setTimestamp(value);
                break;
            case 3:
                var value = (reader.readUint64());
                msg.setHeight(value);
                break;
            case 4:
                var value = (reader.readBytes());
                msg.setStateRoot(value);
                break;
            case 5:
                var value = (reader.readBytes());
                msg.setTransactionsRoot(value);
                break;
            case 6:
                var value = (reader.readBytes());
                msg.setReceiptsRoot(value);
                break;
            case 7:
                var value = (reader.readUint64());
                msg.setGasUsed(value);
                break;
            case 8:
                var value = (reader.readUint64());
                msg.setGasLimit(value);
                break;
            case 9:
                var value = new proto.Proof;
                reader.readMessage(value, proto.Proof.deserializeBinaryFromReader);
                msg.setProof(value);
                break;
            case 10:
                var value = (reader.readBytes());
                msg.setProposer(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.BlockHeader.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.BlockHeader.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.BlockHeader.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getPrevhash_asU8();
    if (f.length > 0) {
        writer.writeBytes(1, f);
    }
    f = message.getTimestamp();
    if (f !== 0) {
        writer.writeUint64(2, f);
    }
    f = message.getHeight();
    if (f !== 0) {
        writer.writeUint64(3, f);
    }
    f = message.getStateRoot_asU8();
    if (f.length > 0) {
        writer.writeBytes(4, f);
    }
    f = message.getTransactionsRoot_asU8();
    if (f.length > 0) {
        writer.writeBytes(5, f);
    }
    f = message.getReceiptsRoot_asU8();
    if (f.length > 0) {
        writer.writeBytes(6, f);
    }
    f = message.getGasUsed();
    if (f !== 0) {
        writer.writeUint64(7, f);
    }
    f = message.getGasLimit();
    if (f !== 0) {
        writer.writeUint64(8, f);
    }
    f = message.getProof();
    if (f != null) {
        writer.writeMessage(9, f, proto.Proof.serializeBinaryToWriter);
    }
    f = message.getProposer_asU8();
    if (f.length > 0) {
        writer.writeBytes(10, f);
    }
};
proto.BlockHeader.prototype.getPrevhash = function () {
    return (jspb.Message.getFieldWithDefault(this, 1, ""));
};
proto.BlockHeader.prototype.getPrevhash_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getPrevhash()));
};
proto.BlockHeader.prototype.getPrevhash_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getPrevhash()));
};
proto.BlockHeader.prototype.setPrevhash = function (value) {
    jspb.Message.setProto3BytesField(this, 1, value);
};
proto.BlockHeader.prototype.getTimestamp = function () {
    return (jspb.Message.getFieldWithDefault(this, 2, 0));
};
proto.BlockHeader.prototype.setTimestamp = function (value) {
    jspb.Message.setProto3IntField(this, 2, value);
};
proto.BlockHeader.prototype.getHeight = function () {
    return (jspb.Message.getFieldWithDefault(this, 3, 0));
};
proto.BlockHeader.prototype.setHeight = function (value) {
    jspb.Message.setProto3IntField(this, 3, value);
};
proto.BlockHeader.prototype.getStateRoot = function () {
    return (jspb.Message.getFieldWithDefault(this, 4, ""));
};
proto.BlockHeader.prototype.getStateRoot_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getStateRoot()));
};
proto.BlockHeader.prototype.getStateRoot_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getStateRoot()));
};
proto.BlockHeader.prototype.setStateRoot = function (value) {
    jspb.Message.setProto3BytesField(this, 4, value);
};
proto.BlockHeader.prototype.getTransactionsRoot = function () {
    return (jspb.Message.getFieldWithDefault(this, 5, ""));
};
proto.BlockHeader.prototype.getTransactionsRoot_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getTransactionsRoot()));
};
proto.BlockHeader.prototype.getTransactionsRoot_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getTransactionsRoot()));
};
proto.BlockHeader.prototype.setTransactionsRoot = function (value) {
    jspb.Message.setProto3BytesField(this, 5, value);
};
proto.BlockHeader.prototype.getReceiptsRoot = function () {
    return (jspb.Message.getFieldWithDefault(this, 6, ""));
};
proto.BlockHeader.prototype.getReceiptsRoot_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getReceiptsRoot()));
};
proto.BlockHeader.prototype.getReceiptsRoot_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getReceiptsRoot()));
};
proto.BlockHeader.prototype.setReceiptsRoot = function (value) {
    jspb.Message.setProto3BytesField(this, 6, value);
};
proto.BlockHeader.prototype.getGasUsed = function () {
    return (jspb.Message.getFieldWithDefault(this, 7, 0));
};
proto.BlockHeader.prototype.setGasUsed = function (value) {
    jspb.Message.setProto3IntField(this, 7, value);
};
proto.BlockHeader.prototype.getGasLimit = function () {
    return (jspb.Message.getFieldWithDefault(this, 8, 0));
};
proto.BlockHeader.prototype.setGasLimit = function (value) {
    jspb.Message.setProto3IntField(this, 8, value);
};
proto.BlockHeader.prototype.getProof = function () {
    return (jspb.Message.getWrapperField(this, proto.Proof, 9));
};
proto.BlockHeader.prototype.setProof = function (value) {
    jspb.Message.setWrapperField(this, 9, value);
};
proto.BlockHeader.prototype.clearProof = function () {
    this.setProof(undefined);
};
proto.BlockHeader.prototype.hasProof = function () {
    return jspb.Message.getField(this, 9) != null;
};
proto.BlockHeader.prototype.getProposer = function () {
    return (jspb.Message.getFieldWithDefault(this, 10, ""));
};
proto.BlockHeader.prototype.getProposer_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getProposer()));
};
proto.BlockHeader.prototype.getProposer_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getProposer()));
};
proto.BlockHeader.prototype.setProposer = function (value) {
    jspb.Message.setProto3BytesField(this, 10, value);
};
proto.Status = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Status, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.Status.displayName = 'proto.Status';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.Status.prototype.toObject = function (opt_includeInstance) {
        return proto.Status.toObject(opt_includeInstance, this);
    };
    proto.Status.toObject = function (includeInstance, msg) {
        var f, obj = {
            hash: msg.getHash_asB64(),
            height: jspb.Message.getFieldWithDefault(msg, 2, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.Status.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.Status;
    return proto.Status.deserializeBinaryFromReader(msg, reader);
};
proto.Status.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = (reader.readBytes());
                msg.setHash(value);
                break;
            case 2:
                var value = (reader.readUint64());
                msg.setHeight(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.Status.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.Status.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.Status.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getHash_asU8();
    if (f.length > 0) {
        writer.writeBytes(1, f);
    }
    f = message.getHeight();
    if (f !== 0) {
        writer.writeUint64(2, f);
    }
};
proto.Status.prototype.getHash = function () {
    return (jspb.Message.getFieldWithDefault(this, 1, ""));
};
proto.Status.prototype.getHash_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getHash()));
};
proto.Status.prototype.getHash_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getHash()));
};
proto.Status.prototype.setHash = function (value) {
    jspb.Message.setProto3BytesField(this, 1, value);
};
proto.Status.prototype.getHeight = function () {
    return (jspb.Message.getFieldWithDefault(this, 2, 0));
};
proto.Status.prototype.setHeight = function (value) {
    jspb.Message.setProto3IntField(this, 2, value);
};
proto.AccountGasLimit = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.AccountGasLimit, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.AccountGasLimit.displayName = 'proto.AccountGasLimit';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.AccountGasLimit.prototype.toObject = function (opt_includeInstance) {
        return proto.AccountGasLimit.toObject(opt_includeInstance, this);
    };
    proto.AccountGasLimit.toObject = function (includeInstance, msg) {
        var f, obj = {
            commonGasLimit: jspb.Message.getFieldWithDefault(msg, 1, 0),
            specificGasLimitMap: (f = msg.getSpecificGasLimitMap()) ? f.toObject(includeInstance, undefined) : []
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.AccountGasLimit.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.AccountGasLimit;
    return proto.AccountGasLimit.deserializeBinaryFromReader(msg, reader);
};
proto.AccountGasLimit.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = (reader.readUint64());
                msg.setCommonGasLimit(value);
                break;
            case 2:
                var value = msg.getSpecificGasLimitMap();
                reader.readMessage(value, function (message, reader) {
                    jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readUint64);
                });
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.AccountGasLimit.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.AccountGasLimit.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.AccountGasLimit.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getCommonGasLimit();
    if (f !== 0) {
        writer.writeUint64(1, f);
    }
    f = message.getSpecificGasLimitMap(true);
    if (f && f.getLength() > 0) {
        f.serializeBinary(2, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeUint64);
    }
};
proto.AccountGasLimit.prototype.getCommonGasLimit = function () {
    return (jspb.Message.getFieldWithDefault(this, 1, 0));
};
proto.AccountGasLimit.prototype.setCommonGasLimit = function (value) {
    jspb.Message.setProto3IntField(this, 1, value);
};
proto.AccountGasLimit.prototype.getSpecificGasLimitMap = function (opt_noLazyCreate) {
    return (jspb.Message.getMapField(this, 2, opt_noLazyCreate, null));
};
proto.AccountGasLimit.prototype.clearSpecificGasLimitMap = function () {
    this.getSpecificGasLimitMap().clear();
};
proto.RichStatus = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.RichStatus.repeatedFields_, null);
};
goog.inherits(proto.RichStatus, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.RichStatus.displayName = 'proto.RichStatus';
}
proto.RichStatus.repeatedFields_ = [3];
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.RichStatus.prototype.toObject = function (opt_includeInstance) {
        return proto.RichStatus.toObject(opt_includeInstance, this);
    };
    proto.RichStatus.toObject = function (includeInstance, msg) {
        var f, obj = {
            hash: msg.getHash_asB64(),
            height: jspb.Message.getFieldWithDefault(msg, 2, 0),
            nodesList: msg.getNodesList_asB64(),
            interval: jspb.Message.getFieldWithDefault(msg, 4, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.RichStatus.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.RichStatus;
    return proto.RichStatus.deserializeBinaryFromReader(msg, reader);
};
proto.RichStatus.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = (reader.readBytes());
                msg.setHash(value);
                break;
            case 2:
                var value = (reader.readUint64());
                msg.setHeight(value);
                break;
            case 3:
                var value = (reader.readBytes());
                msg.addNodes(value);
                break;
            case 4:
                var value = (reader.readUint64());
                msg.setInterval(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.RichStatus.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.RichStatus.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.RichStatus.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getHash_asU8();
    if (f.length > 0) {
        writer.writeBytes(1, f);
    }
    f = message.getHeight();
    if (f !== 0) {
        writer.writeUint64(2, f);
    }
    f = message.getNodesList_asU8();
    if (f.length > 0) {
        writer.writeRepeatedBytes(3, f);
    }
    f = message.getInterval();
    if (f !== 0) {
        writer.writeUint64(4, f);
    }
};
proto.RichStatus.prototype.getHash = function () {
    return (jspb.Message.getFieldWithDefault(this, 1, ""));
};
proto.RichStatus.prototype.getHash_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getHash()));
};
proto.RichStatus.prototype.getHash_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getHash()));
};
proto.RichStatus.prototype.setHash = function (value) {
    jspb.Message.setProto3BytesField(this, 1, value);
};
proto.RichStatus.prototype.getHeight = function () {
    return (jspb.Message.getFieldWithDefault(this, 2, 0));
};
proto.RichStatus.prototype.setHeight = function (value) {
    jspb.Message.setProto3IntField(this, 2, value);
};
proto.RichStatus.prototype.getNodesList = function () {
    return (jspb.Message.getRepeatedField(this, 3));
};
proto.RichStatus.prototype.getNodesList_asB64 = function () {
    return (jspb.Message.bytesListAsB64(this.getNodesList()));
};
proto.RichStatus.prototype.getNodesList_asU8 = function () {
    return (jspb.Message.bytesListAsU8(this.getNodesList()));
};
proto.RichStatus.prototype.setNodesList = function (value) {
    jspb.Message.setField(this, 3, value || []);
};
proto.RichStatus.prototype.addNodes = function (value, opt_index) {
    jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};
proto.RichStatus.prototype.clearNodesList = function () {
    this.setNodesList([]);
};
proto.RichStatus.prototype.getInterval = function () {
    return (jspb.Message.getFieldWithDefault(this, 4, 0));
};
proto.RichStatus.prototype.setInterval = function (value) {
    jspb.Message.setProto3IntField(this, 4, value);
};
proto.Transaction = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Transaction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.Transaction.displayName = 'proto.Transaction';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.Transaction.prototype.toObject = function (opt_includeInstance) {
        return proto.Transaction.toObject(opt_includeInstance, this);
    };
    proto.Transaction.toObject = function (includeInstance, msg) {
        var f, obj = {
            to: jspb.Message.getFieldWithDefault(msg, 1, ""),
            nonce: jspb.Message.getFieldWithDefault(msg, 2, ""),
            quota: jspb.Message.getFieldWithDefault(msg, 3, 0),
            validUntilBlock: jspb.Message.getFieldWithDefault(msg, 4, 0),
            data: msg.getData_asB64(),
            value: jspb.Message.getFieldWithDefault(msg, 6, 0),
            chainId: jspb.Message.getFieldWithDefault(msg, 7, 0),
            version: jspb.Message.getFieldWithDefault(msg, 8, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.Transaction.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.Transaction;
    return proto.Transaction.deserializeBinaryFromReader(msg, reader);
};
proto.Transaction.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = (reader.readString());
                msg.setTo(value);
                break;
            case 2:
                var value = (reader.readString());
                msg.setNonce(value);
                break;
            case 3:
                var value = (reader.readUint64());
                msg.setQuota(value);
                break;
            case 4:
                var value = (reader.readUint64());
                msg.setValidUntilBlock(value);
                break;
            case 5:
                var value = (reader.readBytes());
                msg.setData(value);
                break;
            case 6:
                var value = (reader.readUint64());
                msg.setValue(value);
                break;
            case 7:
                var value = (reader.readUint32());
                msg.setChainId(value);
                break;
            case 8:
                var value = (reader.readUint32());
                msg.setVersion(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.Transaction.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.Transaction.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.Transaction.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getTo();
    if (f.length > 0) {
        writer.writeString(1, f);
    }
    f = message.getNonce();
    if (f.length > 0) {
        writer.writeString(2, f);
    }
    f = message.getQuota();
    if (f !== 0) {
        writer.writeUint64(3, f);
    }
    f = message.getValidUntilBlock();
    if (f !== 0) {
        writer.writeUint64(4, f);
    }
    f = message.getData_asU8();
    if (f.length > 0) {
        writer.writeBytes(5, f);
    }
    f = message.getValue();
    if (f !== 0) {
        writer.writeUint64(6, f);
    }
    f = message.getChainId();
    if (f !== 0) {
        writer.writeUint32(7, f);
    }
    f = message.getVersion();
    if (f !== 0) {
        writer.writeUint32(8, f);
    }
};
proto.Transaction.prototype.getTo = function () {
    return (jspb.Message.getFieldWithDefault(this, 1, ""));
};
proto.Transaction.prototype.setTo = function (value) {
    jspb.Message.setProto3StringField(this, 1, value);
};
proto.Transaction.prototype.getNonce = function () {
    return (jspb.Message.getFieldWithDefault(this, 2, ""));
};
proto.Transaction.prototype.setNonce = function (value) {
    jspb.Message.setProto3StringField(this, 2, value);
};
proto.Transaction.prototype.getQuota = function () {
    return (jspb.Message.getFieldWithDefault(this, 3, 0));
};
proto.Transaction.prototype.setQuota = function (value) {
    jspb.Message.setProto3IntField(this, 3, value);
};
proto.Transaction.prototype.getValidUntilBlock = function () {
    return (jspb.Message.getFieldWithDefault(this, 4, 0));
};
proto.Transaction.prototype.setValidUntilBlock = function (value) {
    jspb.Message.setProto3IntField(this, 4, value);
};
proto.Transaction.prototype.getData = function () {
    return (jspb.Message.getFieldWithDefault(this, 5, ""));
};
proto.Transaction.prototype.getData_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getData()));
};
proto.Transaction.prototype.getData_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getData()));
};
proto.Transaction.prototype.setData = function (value) {
    jspb.Message.setProto3BytesField(this, 5, value);
};
proto.Transaction.prototype.getValue = function () {
    return (jspb.Message.getFieldWithDefault(this, 6, 0));
};
proto.Transaction.prototype.setValue = function (value) {
    jspb.Message.setProto3IntField(this, 6, value);
};
proto.Transaction.prototype.getChainId = function () {
    return (jspb.Message.getFieldWithDefault(this, 7, 0));
};
proto.Transaction.prototype.setChainId = function (value) {
    jspb.Message.setProto3IntField(this, 7, value);
};
proto.Transaction.prototype.getVersion = function () {
    return (jspb.Message.getFieldWithDefault(this, 8, 0));
};
proto.Transaction.prototype.setVersion = function (value) {
    jspb.Message.setProto3IntField(this, 8, value);
};
proto.UnverifiedTransaction = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.UnverifiedTransaction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.UnverifiedTransaction.displayName = 'proto.UnverifiedTransaction';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.UnverifiedTransaction.prototype.toObject = function (opt_includeInstance) {
        return proto.UnverifiedTransaction.toObject(opt_includeInstance, this);
    };
    proto.UnverifiedTransaction.toObject = function (includeInstance, msg) {
        var f, obj = {
            transaction: (f = msg.getTransaction()) && proto.Transaction.toObject(includeInstance, f),
            signature: msg.getSignature_asB64(),
            crypto: jspb.Message.getFieldWithDefault(msg, 3, 0)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.UnverifiedTransaction.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.UnverifiedTransaction;
    return proto.UnverifiedTransaction.deserializeBinaryFromReader(msg, reader);
};
proto.UnverifiedTransaction.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new proto.Transaction;
                reader.readMessage(value, proto.Transaction.deserializeBinaryFromReader);
                msg.setTransaction(value);
                break;
            case 2:
                var value = (reader.readBytes());
                msg.setSignature(value);
                break;
            case 3:
                var value = (reader.readEnum());
                msg.setCrypto(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.UnverifiedTransaction.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.UnverifiedTransaction.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.UnverifiedTransaction.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getTransaction();
    if (f != null) {
        writer.writeMessage(1, f, proto.Transaction.serializeBinaryToWriter);
    }
    f = message.getSignature_asU8();
    if (f.length > 0) {
        writer.writeBytes(2, f);
    }
    f = message.getCrypto();
    if (f !== 0.0) {
        writer.writeEnum(3, f);
    }
};
proto.UnverifiedTransaction.prototype.getTransaction = function () {
    return (jspb.Message.getWrapperField(this, proto.Transaction, 1));
};
proto.UnverifiedTransaction.prototype.setTransaction = function (value) {
    jspb.Message.setWrapperField(this, 1, value);
};
proto.UnverifiedTransaction.prototype.clearTransaction = function () {
    this.setTransaction(undefined);
};
proto.UnverifiedTransaction.prototype.hasTransaction = function () {
    return jspb.Message.getField(this, 1) != null;
};
proto.UnverifiedTransaction.prototype.getSignature = function () {
    return (jspb.Message.getFieldWithDefault(this, 2, ""));
};
proto.UnverifiedTransaction.prototype.getSignature_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getSignature()));
};
proto.UnverifiedTransaction.prototype.getSignature_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getSignature()));
};
proto.UnverifiedTransaction.prototype.setSignature = function (value) {
    jspb.Message.setProto3BytesField(this, 2, value);
};
proto.UnverifiedTransaction.prototype.getCrypto = function () {
    return (jspb.Message.getFieldWithDefault(this, 3, 0));
};
proto.UnverifiedTransaction.prototype.setCrypto = function (value) {
    jspb.Message.setProto3EnumField(this, 3, value);
};
proto.SignedTransaction = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.SignedTransaction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.SignedTransaction.displayName = 'proto.SignedTransaction';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.SignedTransaction.prototype.toObject = function (opt_includeInstance) {
        return proto.SignedTransaction.toObject(opt_includeInstance, this);
    };
    proto.SignedTransaction.toObject = function (includeInstance, msg) {
        var f, obj = {
            transactionWithSig: (f = msg.getTransactionWithSig()) && proto.UnverifiedTransaction.toObject(includeInstance, f),
            txHash: msg.getTxHash_asB64(),
            signer: msg.getSigner_asB64()
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.SignedTransaction.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.SignedTransaction;
    return proto.SignedTransaction.deserializeBinaryFromReader(msg, reader);
};
proto.SignedTransaction.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new proto.UnverifiedTransaction;
                reader.readMessage(value, proto.UnverifiedTransaction.deserializeBinaryFromReader);
                msg.setTransactionWithSig(value);
                break;
            case 2:
                var value = (reader.readBytes());
                msg.setTxHash(value);
                break;
            case 3:
                var value = (reader.readBytes());
                msg.setSigner(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.SignedTransaction.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.SignedTransaction.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.SignedTransaction.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getTransactionWithSig();
    if (f != null) {
        writer.writeMessage(1, f, proto.UnverifiedTransaction.serializeBinaryToWriter);
    }
    f = message.getTxHash_asU8();
    if (f.length > 0) {
        writer.writeBytes(2, f);
    }
    f = message.getSigner_asU8();
    if (f.length > 0) {
        writer.writeBytes(3, f);
    }
};
proto.SignedTransaction.prototype.getTransactionWithSig = function () {
    return (jspb.Message.getWrapperField(this, proto.UnverifiedTransaction, 1));
};
proto.SignedTransaction.prototype.setTransactionWithSig = function (value) {
    jspb.Message.setWrapperField(this, 1, value);
};
proto.SignedTransaction.prototype.clearTransactionWithSig = function () {
    this.setTransactionWithSig(undefined);
};
proto.SignedTransaction.prototype.hasTransactionWithSig = function () {
    return jspb.Message.getField(this, 1) != null;
};
proto.SignedTransaction.prototype.getTxHash = function () {
    return (jspb.Message.getFieldWithDefault(this, 2, ""));
};
proto.SignedTransaction.prototype.getTxHash_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getTxHash()));
};
proto.SignedTransaction.prototype.getTxHash_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getTxHash()));
};
proto.SignedTransaction.prototype.setTxHash = function (value) {
    jspb.Message.setProto3BytesField(this, 2, value);
};
proto.SignedTransaction.prototype.getSigner = function () {
    return (jspb.Message.getFieldWithDefault(this, 3, ""));
};
proto.SignedTransaction.prototype.getSigner_asB64 = function () {
    return (jspb.Message.bytesAsB64(this.getSigner()));
};
proto.SignedTransaction.prototype.getSigner_asU8 = function () {
    return (jspb.Message.bytesAsU8(this.getSigner()));
};
proto.SignedTransaction.prototype.setSigner = function (value) {
    jspb.Message.setProto3BytesField(this, 3, value);
};
proto.BlockBody = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.BlockBody.repeatedFields_, null);
};
goog.inherits(proto.BlockBody, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.BlockBody.displayName = 'proto.BlockBody';
}
proto.BlockBody.repeatedFields_ = [1];
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.BlockBody.prototype.toObject = function (opt_includeInstance) {
        return proto.BlockBody.toObject(opt_includeInstance, this);
    };
    proto.BlockBody.toObject = function (includeInstance, msg) {
        var f, obj = {
            transactionsList: jspb.Message.toObjectList(msg.getTransactionsList(), proto.SignedTransaction.toObject, includeInstance)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.BlockBody.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.BlockBody;
    return proto.BlockBody.deserializeBinaryFromReader(msg, reader);
};
proto.BlockBody.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new proto.SignedTransaction;
                reader.readMessage(value, proto.SignedTransaction.deserializeBinaryFromReader);
                msg.addTransactions(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.BlockBody.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.BlockBody.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.BlockBody.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getTransactionsList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(1, f, proto.SignedTransaction.serializeBinaryToWriter);
    }
};
proto.BlockBody.prototype.getTransactionsList = function () {
    return (jspb.Message.getRepeatedWrapperField(this, proto.SignedTransaction, 1));
};
proto.BlockBody.prototype.setTransactionsList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 1, value);
};
proto.BlockBody.prototype.addTransactions = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.SignedTransaction, opt_index);
};
proto.BlockBody.prototype.clearTransactionsList = function () {
    this.setTransactionsList([]);
};
proto.Block = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Block, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.Block.displayName = 'proto.Block';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.Block.prototype.toObject = function (opt_includeInstance) {
        return proto.Block.toObject(opt_includeInstance, this);
    };
    proto.Block.toObject = function (includeInstance, msg) {
        var f, obj = {
            version: jspb.Message.getFieldWithDefault(msg, 1, 0),
            header: (f = msg.getHeader()) && proto.BlockHeader.toObject(includeInstance, f),
            body: (f = msg.getBody()) && proto.BlockBody.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.Block.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.Block;
    return proto.Block.deserializeBinaryFromReader(msg, reader);
};
proto.Block.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = (reader.readUint32());
                msg.setVersion(value);
                break;
            case 2:
                var value = new proto.BlockHeader;
                reader.readMessage(value, proto.BlockHeader.deserializeBinaryFromReader);
                msg.setHeader(value);
                break;
            case 3:
                var value = new proto.BlockBody;
                reader.readMessage(value, proto.BlockBody.deserializeBinaryFromReader);
                msg.setBody(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.Block.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.Block.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.Block.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getVersion();
    if (f !== 0) {
        writer.writeUint32(1, f);
    }
    f = message.getHeader();
    if (f != null) {
        writer.writeMessage(2, f, proto.BlockHeader.serializeBinaryToWriter);
    }
    f = message.getBody();
    if (f != null) {
        writer.writeMessage(3, f, proto.BlockBody.serializeBinaryToWriter);
    }
};
proto.Block.prototype.getVersion = function () {
    return (jspb.Message.getFieldWithDefault(this, 1, 0));
};
proto.Block.prototype.setVersion = function (value) {
    jspb.Message.setProto3IntField(this, 1, value);
};
proto.Block.prototype.getHeader = function () {
    return (jspb.Message.getWrapperField(this, proto.BlockHeader, 2));
};
proto.Block.prototype.setHeader = function (value) {
    jspb.Message.setWrapperField(this, 2, value);
};
proto.Block.prototype.clearHeader = function () {
    this.setHeader(undefined);
};
proto.Block.prototype.hasHeader = function () {
    return jspb.Message.getField(this, 2) != null;
};
proto.Block.prototype.getBody = function () {
    return (jspb.Message.getWrapperField(this, proto.BlockBody, 3));
};
proto.Block.prototype.setBody = function (value) {
    jspb.Message.setWrapperField(this, 3, value);
};
proto.Block.prototype.clearBody = function () {
    this.setBody(undefined);
};
proto.Block.prototype.hasBody = function () {
    return jspb.Message.getField(this, 3) != null;
};
proto.BlockWithProof = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.BlockWithProof, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.BlockWithProof.displayName = 'proto.BlockWithProof';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.BlockWithProof.prototype.toObject = function (opt_includeInstance) {
        return proto.BlockWithProof.toObject(opt_includeInstance, this);
    };
    proto.BlockWithProof.toObject = function (includeInstance, msg) {
        var f, obj = {
            blk: (f = msg.getBlk()) && proto.Block.toObject(includeInstance, f),
            proof: (f = msg.getProof()) && proto.Proof.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.BlockWithProof.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.BlockWithProof;
    return proto.BlockWithProof.deserializeBinaryFromReader(msg, reader);
};
proto.BlockWithProof.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new proto.Block;
                reader.readMessage(value, proto.Block.deserializeBinaryFromReader);
                msg.setBlk(value);
                break;
            case 2:
                var value = new proto.Proof;
                reader.readMessage(value, proto.Proof.deserializeBinaryFromReader);
                msg.setProof(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.BlockWithProof.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.BlockWithProof.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.BlockWithProof.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getBlk();
    if (f != null) {
        writer.writeMessage(1, f, proto.Block.serializeBinaryToWriter);
    }
    f = message.getProof();
    if (f != null) {
        writer.writeMessage(2, f, proto.Proof.serializeBinaryToWriter);
    }
};
proto.BlockWithProof.prototype.getBlk = function () {
    return (jspb.Message.getWrapperField(this, proto.Block, 1));
};
proto.BlockWithProof.prototype.setBlk = function (value) {
    jspb.Message.setWrapperField(this, 1, value);
};
proto.BlockWithProof.prototype.clearBlk = function () {
    this.setBlk(undefined);
};
proto.BlockWithProof.prototype.hasBlk = function () {
    return jspb.Message.getField(this, 1) != null;
};
proto.BlockWithProof.prototype.getProof = function () {
    return (jspb.Message.getWrapperField(this, proto.Proof, 2));
};
proto.BlockWithProof.prototype.setProof = function (value) {
    jspb.Message.setWrapperField(this, 2, value);
};
proto.BlockWithProof.prototype.clearProof = function () {
    this.setProof(undefined);
};
proto.BlockWithProof.prototype.hasProof = function () {
    return jspb.Message.getField(this, 2) != null;
};
proto.BlockTxs = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.BlockTxs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.BlockTxs.displayName = 'proto.BlockTxs';
}
if (jspb.Message.GENERATE_TO_OBJECT) {
    proto.BlockTxs.prototype.toObject = function (opt_includeInstance) {
        return proto.BlockTxs.toObject(opt_includeInstance, this);
    };
    proto.BlockTxs.toObject = function (includeInstance, msg) {
        var f, obj = {
            height: jspb.Message.getFieldWithDefault(msg, 1, 0),
            body: (f = msg.getBody()) && proto.BlockBody.toObject(includeInstance, f)
        };
        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}
proto.BlockTxs.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.BlockTxs;
    return proto.BlockTxs.deserializeBinaryFromReader(msg, reader);
};
proto.BlockTxs.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = (reader.readUint64());
                msg.setHeight(value);
                break;
            case 3:
                var value = new proto.BlockBody;
                reader.readMessage(value, proto.BlockBody.deserializeBinaryFromReader);
                msg.setBody(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};
proto.BlockTxs.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.BlockTxs.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};
proto.BlockTxs.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getHeight();
    if (f !== 0) {
        writer.writeUint64(1, f);
    }
    f = message.getBody();
    if (f != null) {
        writer.writeMessage(3, f, proto.BlockBody.serializeBinaryToWriter);
    }
};
proto.BlockTxs.prototype.getHeight = function () {
    return (jspb.Message.getFieldWithDefault(this, 1, 0));
};
proto.BlockTxs.prototype.setHeight = function (value) {
    jspb.Message.setProto3IntField(this, 1, value);
};
proto.BlockTxs.prototype.getBody = function () {
    return (jspb.Message.getWrapperField(this, proto.BlockBody, 3));
};
proto.BlockTxs.prototype.setBody = function (value) {
    jspb.Message.setWrapperField(this, 3, value);
};
proto.BlockTxs.prototype.clearBody = function () {
    this.setBody(undefined);
};
proto.BlockTxs.prototype.hasBody = function () {
    return jspb.Message.getField(this, 3) != null;
};
proto.ProofType = {
    AUTHORITYROUND: 0,
    RAFT: 1,
    TENDERMINT: 2
};
proto.Crypto = {
    SECP: 0,
    SM2: 1
};
goog.object.extend(exports, proto);
