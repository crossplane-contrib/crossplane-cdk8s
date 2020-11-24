// generated by cdk8s
import { ApiObject } from 'cdk8s';
import { Construct } from 'constructs';

/**
 * A Queue is a managed resource that represents a AWS Simple Queue
 *
 * @schema Queue
 */
export class Queue extends ApiObject {
  /**
   * Defines a "Queue" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialiation props
   */
  public constructor(scope: Construct, id: string, props: QueueProps) {
    super(scope, id, {
      ...props,
      kind: 'Queue',
      apiVersion: 'sqs.aws.crossplane.io/v1beta1',
    });
  }
}

/**
 * A Queue is a managed resource that represents a AWS Simple Queue
 *
 * @schema Queue
 */
export interface QueueProps {
  /**
   * @schema Queue#metadata
   */
  readonly metadata?: any;

  /**
   * QueueSpec defines the desired state of a Queue.
   *
   * @schema Queue#spec
   */
  readonly spec: QueueSpec;

}

/**
 * QueueSpec defines the desired state of a Queue.
 *
 * @schema QueueSpec
 */
export interface QueueSpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. The "Delete" policy is the default when no policy is specified.
   *
   * @schema QueueSpec#deletionPolicy
   */
  readonly deletionPolicy?: QueueSpecDeletionPolicy;

  /**
   * QueueParameters define the desired state of an AWS Queue
   *
   * @schema QueueSpec#forProvider
   */
  readonly forProvider: QueueSpecForProvider;

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema QueueSpec#providerConfigRef
   */
  readonly providerConfigRef?: QueueSpecProviderConfigRef;

  /**
   * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
   *
   * @schema QueueSpec#providerRef
   */
  readonly providerRef?: QueueSpecProviderRef;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema QueueSpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: QueueSpecWriteConnectionSecretToRef;

}

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. The "Delete" policy is the default when no policy is specified.
 *
 * @schema QueueSpecDeletionPolicy
 */
export enum QueueSpecDeletionPolicy {
  /** Orphan */
  ORPHAN = 'Orphan',
  /** Delete */
  DELETE = 'Delete',
}

/**
 * QueueParameters define the desired state of an AWS Queue
 *
 * @schema QueueSpecForProvider
 */
export interface QueueSpecForProvider {
  /**
   * ContentBasedDeduplication - Enables content-based deduplication. Valid values: true, false. For more information, see Exactly-Once Processing (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html#FIFO-queues-exactly-once-processing) in the Amazon Simple Queue Service Developer Guide. Every message must have a unique MessageDeduplicationId, You may provide a MessageDeduplicationId explicitly. If you aren't able to provide a MessageDeduplicationId and you enable ContentBasedDeduplication for your queue, Amazon SQS uses a SHA-256 hash to generate the MessageDeduplicationId using the body of the message (but not the attributes of the message). If you don't provide a MessageDeduplicationId and the queue doesn't have ContentBasedDeduplication set, the action fails with an error. If the queue has ContentBasedDeduplication set, your MessageDeduplicationId overrides the generated one. When ContentBasedDeduplication is in effect, messages with identical content sent within the deduplication interval are treated as duplicates and only one copy of the message is delivered. If you send one message with ContentBasedDeduplication enabled and then another message with a MessageDeduplicationId that is the same as the one generated for the first MessageDeduplicationId, the two messages are treated as duplicates and only one copy of the message is delivered.
   *
   * @schema QueueSpecForProvider#contentBasedDeduplication
   */
  readonly contentBasedDeduplication?: boolean;

  /**
   * DelaySeconds - The length of time, in seconds, for which the delivery of all messages in the queue is delayed. Valid values: An integer from 0 to 900 (15 minutes). Default: 0.
   *
   * @schema QueueSpecForProvider#delaySeconds
   */
  readonly delaySeconds?: number;

  /**
   * FIFOQueue - Designates a queue as FIFO. Valid values: true, false. If 	you don't specify the FifoQueue attribute, Amazon SQS creates a standard 	queue. You can provide this attribute only during queue creation. You 	can't change it for an existing queue. When you set this attribute, you 	must also provide the MessageGroupId for your messages explicitly. For 	more information, see FIFO Queue Logic (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html#FIFO-queues-understanding-logic) 	in the Amazon Simple Queue Service Developer Guide.
   *
   * @schema QueueSpecForProvider#fifoQueue
   */
  readonly fifoQueue?: boolean;

  /**
   * KMSDataKeyReusePeriodSeconds - The length of time, in seconds, for which Amazon SQS can reuse a data key (https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#data-keys) to encrypt or decrypt messages before calling AWS KMS again. An integer representing seconds, between 60 seconds (1 minute) and 86,400 seconds (24 hours). Default: 300 (5 minutes). A shorter time period provides better security but results in more calls to KMS which might incur charges after Free Tier. For more information, see How Does the Data Key Reuse Period Work? (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html#sqs-how-does-the-data-key-reuse-period-work). Applies only to server-side-encryption (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html):
   *
   * @schema QueueSpecForProvider#kmsDataKeyReusePeriodSeconds
   */
  readonly kmsDataKeyReusePeriodSeconds?: number;

  /**
   * KMSMasterKeyID - The ID of an AWS-managed customer master key (CMK) for Amazon SQS or a custom CMK. For more information, see Key Terms (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html#sqs-sse-key-terms). While the alias of the AWS-managed CMK for Amazon SQS is always alias/aws/sqs, the alias of a custom CMK can, for example, be alias/MyAlias . For more examples, see KeyId (https://docs.aws.amazon.com/kms/latest/APIReference/API_DescribeKey.html#API_DescribeKey_RequestParameters) in the AWS Key Management Service API Reference. Applies only to server-side-encryption (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-server-side-encryption.html):
   *
   * @schema QueueSpecForProvider#kmsMasterKeyId
   */
  readonly kmsMasterKeyId?: string;

  /**
   * MaximumMessageSize is the limit of how many bytes a message can contain before Amazon SQS rejects it. Valid values: An integer from 1,024 bytes (1 KiB) up to 262,144 bytes (256 KiB). Default: 262,144 (256 KiB).
   *
   * @schema QueueSpecForProvider#maximumMessageSize
   */
  readonly maximumMessageSize?: number;

  /**
   * MessageRetentionPeriod - The length of time, in seconds, for which Amazon SQS retains a message. Valid values: An integer representing seconds, from 60 (1 minute) to 1,209,600 (14 days). Default: 345,600 (4 days).
   *
   * @schema QueueSpecForProvider#messageRetentionPeriod
   */
  readonly messageRetentionPeriod?: number;

  /**
   * The queue's policy. A valid AWS policy. For more information about policy structure, see Overview of AWS IAM Policies (https://docs.aws.amazon.com/IAM/latest/UserGuide/PoliciesOverview.html) in the Amazon IAM User Guide.
   *
   * @schema QueueSpecForProvider#policy
   */
  readonly policy?: string;

  /**
   * ReceiveMessageWaitTimeSeconds - The length of time, in seconds, for which a ReceiveMessage action waits for a message to arrive. Valid values: an integer from 0 to 20 (seconds). Default: 0.
   *
   * @schema QueueSpecForProvider#receiveMessageWaitTimeSeconds
   */
  readonly receiveMessageWaitTimeSeconds?: number;

  /**
   * RedrivePolicy includes the parameters for the dead-letter queue functionality of the source queue. For more information about the redrive policy and dead-letter queues, see Using Amazon SQS Dead-Letter Queues (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html) in the Amazon Simple Queue Service Developer Guide
   *
   * @schema QueueSpecForProvider#redrivePolicy
   */
  readonly redrivePolicy?: QueueSpecForProviderRedrivePolicy;

  /**
   * Region is the region you'd like your Queue to be created in.
   *
   * @schema QueueSpecForProvider#region
   */
  readonly region: string;

  /**
   * Tags add cost allocation tags to the specified Amazon SQS queue.
   *
   * @schema QueueSpecForProvider#tags
   */
  readonly tags?: { [key: string]: string };

  /**
   * VisibilityTimeout - The visibility timeout for the queue, in seconds. Valid values: an integer from 0 to 43,200 (12 hours). Default: 30. For more information about the visibility timeout, see Visibility Timeout (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html) in the Amazon Simple Queue Service Developer Guide.
   *
   * @schema QueueSpecForProvider#visibilityTimeout
   */
  readonly visibilityTimeout?: number;

}

/**
 * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
 *
 * @schema QueueSpecProviderConfigRef
 */
export interface QueueSpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema QueueSpecProviderConfigRef#name
   */
  readonly name: string;

}

/**
 * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
 *
 * @schema QueueSpecProviderRef
 */
export interface QueueSpecProviderRef {
  /**
   * Name of the referenced object.
   *
   * @schema QueueSpecProviderRef#name
   */
  readonly name: string;

}

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema QueueSpecWriteConnectionSecretToRef
 */
export interface QueueSpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema QueueSpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema QueueSpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * RedrivePolicy includes the parameters for the dead-letter queue functionality of the source queue. For more information about the redrive policy and dead-letter queues, see Using Amazon SQS Dead-Letter Queues (https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html) in the Amazon Simple Queue Service Developer Guide
 *
 * @schema QueueSpecForProviderRedrivePolicy
 */
export interface QueueSpecForProviderRedrivePolicy {
  /**
   * The Amazon Resource Name (ARN) of the dead-letter queue to which Amazon SQS moves messages after the value of maxReceiveCount is exceeded.
   *
   * @schema QueueSpecForProviderRedrivePolicy#deadLetterQueueARN
   */
  readonly deadLetterQueueARN?: string;

  /**
   * The number of times a message is delivered to the source queue before being moved to the dead-letter queue.
   *
   * @schema QueueSpecForProviderRedrivePolicy#maxReceiveCount
   */
  readonly maxReceiveCount?: number;

}

