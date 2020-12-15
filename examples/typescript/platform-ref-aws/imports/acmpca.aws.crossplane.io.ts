// generated by cdk8s
import { ApiObject, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

/**
 * CertificateAuthority is a managed resource that represents an AWS CertificateAuthority Manager.
 *
 * @schema CertificateAuthority
 */
export class CertificateAuthority extends ApiObject {
  /**
   * Returns the apiVersion and kind for "CertificateAuthority"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'acmpca.aws.crossplane.io/v1alpha1',
    kind: 'CertificateAuthority',
  }

  /**
   * Renders a Kubernetes manifest for "CertificateAuthority".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: CertificateAuthorityProps = {}): any {
    return {
      ...CertificateAuthority.GVK,
      ...props,
    };
  }

  /**
   * Defines a "CertificateAuthority" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: CertificateAuthorityProps = {}) {
    super(scope, id, CertificateAuthority.manifest(props));
  }
}

/**
 * CertificateAuthority is a managed resource that represents an AWS CertificateAuthority Manager.
 *
 * @schema CertificateAuthority
 */
export interface CertificateAuthorityProps {
  /**
   * @schema CertificateAuthority#metadata
   */
  readonly metadata?: any;

  /**
   * CertificateAuthoritySpec defines the desired state of CertificateAuthority
   *
   * @schema CertificateAuthority#spec
   */
  readonly spec?: CertificateAuthoritySpec;

}

/**
 * CertificateAuthoritySpec defines the desired state of CertificateAuthority
 *
 * @schema CertificateAuthoritySpec
 */
export interface CertificateAuthoritySpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. The "Delete" policy is the default when no policy is specified.
   *
   * @schema CertificateAuthoritySpec#deletionPolicy
   */
  readonly deletionPolicy?: CertificateAuthoritySpecDeletionPolicy;

  /**
   * CertificateAuthorityParameters defines the desired state of an AWS CertificateAuthority.
   *
   * @schema CertificateAuthoritySpec#forProvider
   */
  readonly forProvider: CertificateAuthoritySpecForProvider;

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema CertificateAuthoritySpec#providerConfigRef
   */
  readonly providerConfigRef?: CertificateAuthoritySpecProviderConfigRef;

  /**
   * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
   *
   * @schema CertificateAuthoritySpec#providerRef
   */
  readonly providerRef?: CertificateAuthoritySpecProviderRef;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema CertificateAuthoritySpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: CertificateAuthoritySpecWriteConnectionSecretToRef;

}

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. The "Delete" policy is the default when no policy is specified.
 *
 * @schema CertificateAuthoritySpecDeletionPolicy
 */
export enum CertificateAuthoritySpecDeletionPolicy {
  /** Orphan */
  ORPHAN = "Orphan",
  /** Delete */
  DELETE = "Delete",
}

/**
 * CertificateAuthorityParameters defines the desired state of an AWS CertificateAuthority.
 *
 * @schema CertificateAuthoritySpecForProvider
 */
export interface CertificateAuthoritySpecForProvider {
  /**
   * CertificateAuthorityConfiguration to associate with the certificateAuthority.
   *
   * @schema CertificateAuthoritySpecForProvider#certificateAuthorityConfiguration
   */
  readonly certificateAuthorityConfiguration: CertificateAuthoritySpecForProviderCertificateAuthorityConfiguration;

  /**
   * The number of days to make a CA restorable after it has been deleted
   *
   * @schema CertificateAuthoritySpecForProvider#permanentDeletionTimeInDays
   */
  readonly permanentDeletionTimeInDays?: number;

  /**
   * Region is the region you'd like your CertificateAuthority to be created in.
   *
   * @schema CertificateAuthoritySpecForProvider#region
   */
  readonly region: string;

  /**
   * RevocationConfiguration to associate with the certificateAuthority.
   *
   * @schema CertificateAuthoritySpecForProvider#revocationConfiguration
   */
  readonly revocationConfiguration?: CertificateAuthoritySpecForProviderRevocationConfiguration;

  /**
   * Status of the certificate authority. This value cannot be configured at creation, but can be updated to set a CA to ACTIVE or DISABLED.
   *
   * @schema CertificateAuthoritySpecForProvider#status
   */
  readonly status?: CertificateAuthoritySpecForProviderStatus;

  /**
   * One or more resource tags to associate with the certificateAuthority.
   *
   * @schema CertificateAuthoritySpecForProvider#tags
   */
  readonly tags: CertificateAuthoritySpecForProviderTags[];

  /**
   * Type of the certificate authority
   *
   * @schema CertificateAuthoritySpecForProvider#type
   */
  readonly type: CertificateAuthoritySpecForProviderType;

}

/**
 * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
 *
 * @schema CertificateAuthoritySpecProviderConfigRef
 */
export interface CertificateAuthoritySpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema CertificateAuthoritySpecProviderConfigRef#name
   */
  readonly name: string;

}

/**
 * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
 *
 * @schema CertificateAuthoritySpecProviderRef
 */
export interface CertificateAuthoritySpecProviderRef {
  /**
   * Name of the referenced object.
   *
   * @schema CertificateAuthoritySpecProviderRef#name
   */
  readonly name: string;

}

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema CertificateAuthoritySpecWriteConnectionSecretToRef
 */
export interface CertificateAuthoritySpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema CertificateAuthoritySpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema CertificateAuthoritySpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * CertificateAuthorityConfiguration to associate with the certificateAuthority.
 *
 * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfiguration
 */
export interface CertificateAuthoritySpecForProviderCertificateAuthorityConfiguration {
  /**
   * Type of the public key algorithm
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfiguration#keyAlgorithm
   */
  readonly keyAlgorithm: CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationKeyAlgorithm;

  /**
   * Algorithm that private CA uses to sign certificate requests
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfiguration#signingAlgorithm
   */
  readonly signingAlgorithm: CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSigningAlgorithm;

  /**
   * Subject is information of Certificate Authority
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfiguration#subject
   */
  readonly subject: CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject;

}

/**
 * RevocationConfiguration to associate with the certificateAuthority.
 *
 * @schema CertificateAuthoritySpecForProviderRevocationConfiguration
 */
export interface CertificateAuthoritySpecForProviderRevocationConfiguration {
  /**
   * Alias for the CRL distribution point
   *
   * @schema CertificateAuthoritySpecForProviderRevocationConfiguration#customCname
   */
  readonly customCname?: string;

  /**
   * Boolean value that specifies certificate revocation
   *
   * @schema CertificateAuthoritySpecForProviderRevocationConfiguration#enabled
   */
  readonly enabled: boolean;

  /**
   * Number of days until a certificate expires
   *
   * @schema CertificateAuthoritySpecForProviderRevocationConfiguration#expirationInDays
   */
  readonly expirationInDays?: number;

  /**
   * Name of the S3 bucket that contains the CRL
   *
   * @schema CertificateAuthoritySpecForProviderRevocationConfiguration#s3BucketName
   */
  readonly s3BucketName?: string;

}

/**
 * Status of the certificate authority. This value cannot be configured at creation, but can be updated to set a CA to ACTIVE or DISABLED.
 *
 * @schema CertificateAuthoritySpecForProviderStatus
 */
export enum CertificateAuthoritySpecForProviderStatus {
  /** ACTIVE */
  ACTIVE = "ACTIVE",
  /** DISABLED */
  DISABLED = "DISABLED",
}

/**
 * Tag represents user-provided metadata that can be associated
 *
 * @schema CertificateAuthoritySpecForProviderTags
 */
export interface CertificateAuthoritySpecForProviderTags {
  /**
   * The key name that can be used to look up or retrieve the associated value.
   *
   * @schema CertificateAuthoritySpecForProviderTags#key
   */
  readonly key: string;

  /**
   * The value associated with this tag.
   *
   * @schema CertificateAuthoritySpecForProviderTags#value
   */
  readonly value: string;

}

/**
 * Type of the certificate authority
 *
 * @schema CertificateAuthoritySpecForProviderType
 */
export enum CertificateAuthoritySpecForProviderType {
  /** ROOT */
  ROOT = "ROOT",
  /** SUBORINATE */
  SUBORINATE = "SUBORINATE",
}

/**
 * Type of the public key algorithm
 *
 * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationKeyAlgorithm
 */
export enum CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationKeyAlgorithm {
  /** RSA_2048 */
  RSA_2048 = "RSA_2048",
  /** EC_secp384r1 */
  EC_SECP384R1 = "EC_secp384r1",
  /** EC_prime256v1 */
  EC_PRIME256V1 = "EC_prime256v1",
  /** RSA_4096 */
  RSA_4096 = "RSA_4096",
}

/**
 * Algorithm that private CA uses to sign certificate requests
 *
 * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSigningAlgorithm
 */
export enum CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSigningAlgorithm {
  /** SHA512WITHECDSA */
  SHA512_WITHECDSA = "SHA512WITHECDSA",
  /** SHA256WITHECDSA */
  SHA256_WITHECDSA = "SHA256WITHECDSA",
  /** SHA384WITHECDSA */
  SHA384_WITHECDSA = "SHA384WITHECDSA",
  /** SHA512WITHRSA */
  SHA512_WITHRSA = "SHA512WITHRSA",
  /** SHA256WITHRSA */
  SHA256_WITHRSA = "SHA256WITHRSA",
  /** SHA384WITHRSA */
  SHA384_WITHRSA = "SHA384WITHRSA",
}

/**
 * Subject is information of Certificate Authority
 *
 * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject
 */
export interface CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject {
  /**
   * FQDN associated with the certificate subject
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#commonName
   */
  readonly commonName: string;

  /**
   * Two-digit code that specifies the country
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#country
   */
  readonly country: string;

  /**
   * Disambiguating information for the certificate subject.
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#distinguishedNameQualifier
   */
  readonly distinguishedNameQualifier?: string;

  /**
   * Typically a qualifier appended to the name of an individual
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#generationQualifier
   */
  readonly generationQualifier?: string;

  /**
   * First name
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#givenName
   */
  readonly givenName?: string;

  /**
   * Concatenation of first letter of the GivenName, Middle name and SurName.
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#initials
   */
  readonly initials?: string;

  /**
   * The locality such as a city or town
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#locality
   */
  readonly locality: string;

  /**
   * Organization legal name
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#organization
   */
  readonly organization: string;

  /**
   * Organization's subdivision or unit
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#organizationalUnit
   */
  readonly organizationalUnit: string;

  /**
   * Shortened version of a longer GivenName
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#pseudonym
   */
  readonly pseudonym?: string;

  /**
   * The certificate serial number.
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#serialNumber
   */
  readonly serialNumber?: string;

  /**
   * State in which the subject of the certificate is located
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#state
   */
  readonly state: string;

  /**
   * Surname
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#surname
   */
  readonly surname?: string;

  /**
   * Title
   *
   * @schema CertificateAuthoritySpecForProviderCertificateAuthorityConfigurationSubject#title
   */
  readonly title?: string;

}

/**
 * CertificateAuthorityPermission is a managed resource that represents an AWS CertificateAuthorityPermission Manager.
 *
 * @schema CertificateAuthorityPermission
 */
export class CertificateAuthorityPermission extends ApiObject {
  /**
   * Returns the apiVersion and kind for "CertificateAuthorityPermission"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'acmpca.aws.crossplane.io/v1alpha1',
    kind: 'CertificateAuthorityPermission',
  }

  /**
   * Renders a Kubernetes manifest for "CertificateAuthorityPermission".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: CertificateAuthorityPermissionProps = {}): any {
    return {
      ...CertificateAuthorityPermission.GVK,
      ...props,
    };
  }

  /**
   * Defines a "CertificateAuthorityPermission" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: CertificateAuthorityPermissionProps = {}) {
    super(scope, id, CertificateAuthorityPermission.manifest(props));
  }
}

/**
 * CertificateAuthorityPermission is a managed resource that represents an AWS CertificateAuthorityPermission Manager.
 *
 * @schema CertificateAuthorityPermission
 */
export interface CertificateAuthorityPermissionProps {
  /**
   * @schema CertificateAuthorityPermission#metadata
   */
  readonly metadata?: any;

  /**
   * CertificateAuthorityPermissionSpec defines the desired state of CertificateAuthorityPermission
   *
   * @schema CertificateAuthorityPermission#spec
   */
  readonly spec?: CertificateAuthorityPermissionSpec;

}

/**
 * CertificateAuthorityPermissionSpec defines the desired state of CertificateAuthorityPermission
 *
 * @schema CertificateAuthorityPermissionSpec
 */
export interface CertificateAuthorityPermissionSpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. The "Delete" policy is the default when no policy is specified.
   *
   * @schema CertificateAuthorityPermissionSpec#deletionPolicy
   */
  readonly deletionPolicy?: CertificateAuthorityPermissionSpecDeletionPolicy;

  /**
   * CertificateAuthorityPermissionParameters defines the desired state of an AWS CertificateAuthority.
   *
   * @schema CertificateAuthorityPermissionSpec#forProvider
   */
  readonly forProvider: CertificateAuthorityPermissionSpecForProvider;

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema CertificateAuthorityPermissionSpec#providerConfigRef
   */
  readonly providerConfigRef?: CertificateAuthorityPermissionSpecProviderConfigRef;

  /**
   * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
   *
   * @schema CertificateAuthorityPermissionSpec#providerRef
   */
  readonly providerRef?: CertificateAuthorityPermissionSpecProviderRef;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema CertificateAuthorityPermissionSpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: CertificateAuthorityPermissionSpecWriteConnectionSecretToRef;

}

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. The "Delete" policy is the default when no policy is specified.
 *
 * @schema CertificateAuthorityPermissionSpecDeletionPolicy
 */
export enum CertificateAuthorityPermissionSpecDeletionPolicy {
  /** Orphan */
  ORPHAN = "Orphan",
  /** Delete */
  DELETE = "Delete",
}

/**
 * CertificateAuthorityPermissionParameters defines the desired state of an AWS CertificateAuthority.
 *
 * @schema CertificateAuthorityPermissionSpecForProvider
 */
export interface CertificateAuthorityPermissionSpecForProvider {
  /**
   * The actions that the specified AWS service principal can use.
   *
   * @schema CertificateAuthorityPermissionSpecForProvider#actions
   */
  readonly actions?: string[];

  /**
   * The Amazon Resource Name (ARN) of the private certificate authority (CA)that will be used to issue the certificate.
   *
   * @schema CertificateAuthorityPermissionSpecForProvider#certificateAuthorityARN
   */
  readonly certificateAuthorityARN?: string;

  /**
   * CertificateAuthorityARNRef references an CertificateAuthority to retrieve its Arn
   *
   * @schema CertificateAuthorityPermissionSpecForProvider#certificateAuthorityARNRef
   */
  readonly certificateAuthorityARNRef?: CertificateAuthorityPermissionSpecForProviderCertificateAuthorityArnRef;

  /**
   * CertificateAuthorityARNSelector selects a reference to an CertificateAuthority to retrieve its Arn
   *
   * @schema CertificateAuthorityPermissionSpecForProvider#certificateAuthorityARNSelector
   */
  readonly certificateAuthorityARNSelector?: CertificateAuthorityPermissionSpecForProviderCertificateAuthorityArnSelector;

  /**
   * The AWS Service or identity
   *
   * @schema CertificateAuthorityPermissionSpecForProvider#principal
   */
  readonly principal?: string;

  /**
   * Region is the region of CertificateAuthorityPermission.
   *
   * @schema CertificateAuthorityPermissionSpecForProvider#region
   */
  readonly region: string;

  /**
   * Calling Account ID
   *
   * @schema CertificateAuthorityPermissionSpecForProvider#sourceAccount
   */
  readonly sourceAccount?: string;

}

/**
 * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
 *
 * @schema CertificateAuthorityPermissionSpecProviderConfigRef
 */
export interface CertificateAuthorityPermissionSpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema CertificateAuthorityPermissionSpecProviderConfigRef#name
   */
  readonly name: string;

}

/**
 * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
 *
 * @schema CertificateAuthorityPermissionSpecProviderRef
 */
export interface CertificateAuthorityPermissionSpecProviderRef {
  /**
   * Name of the referenced object.
   *
   * @schema CertificateAuthorityPermissionSpecProviderRef#name
   */
  readonly name: string;

}

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema CertificateAuthorityPermissionSpecWriteConnectionSecretToRef
 */
export interface CertificateAuthorityPermissionSpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema CertificateAuthorityPermissionSpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema CertificateAuthorityPermissionSpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * CertificateAuthorityARNRef references an CertificateAuthority to retrieve its Arn
 *
 * @schema CertificateAuthorityPermissionSpecForProviderCertificateAuthorityArnRef
 */
export interface CertificateAuthorityPermissionSpecForProviderCertificateAuthorityArnRef {
  /**
   * Name of the referenced object.
   *
   * @schema CertificateAuthorityPermissionSpecForProviderCertificateAuthorityArnRef#name
   */
  readonly name: string;

}

/**
 * CertificateAuthorityARNSelector selects a reference to an CertificateAuthority to retrieve its Arn
 *
 * @schema CertificateAuthorityPermissionSpecForProviderCertificateAuthorityArnSelector
 */
export interface CertificateAuthorityPermissionSpecForProviderCertificateAuthorityArnSelector {
  /**
   * MatchControllerRef ensures an object with the same controller reference as the selecting object is selected.
   *
   * @schema CertificateAuthorityPermissionSpecForProviderCertificateAuthorityArnSelector#matchControllerRef
   */
  readonly matchControllerRef?: boolean;

  /**
   * MatchLabels ensures an object with matching labels is selected.
   *
   * @schema CertificateAuthorityPermissionSpecForProviderCertificateAuthorityArnSelector#matchLabels
   */
  readonly matchLabels?: { [key: string]: string };

}

