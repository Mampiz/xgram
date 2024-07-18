package services

import (
	"bytes"
	"context"
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
)

type S3Uploader struct {
	Client     *s3.Client
	BucketName string
}

func NewS3Uploader() (*S3Uploader, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(os.Getenv("AWS_REGION")))
	if err != nil {
		return nil, fmt.Errorf("unable to load SDK config, %v", err)
	}

	s3Client := s3.NewFromConfig(cfg)

	bucketName := os.Getenv("S3_BUCKET_NAME")
	if bucketName == "" {
		return nil, fmt.Errorf("S3 bucket name not set in environment variables")
	}

	return &S3Uploader{
		Client:     s3Client,
		BucketName: bucketName,
	}, nil
}

func (uploader *S3Uploader) UploadFile(file multipart.File, fileHeader *multipart.FileHeader) (string, error) {
	buffer := make([]byte, fileHeader.Size)
	file.Read(buffer)

	fileName := fmt.Sprintf("%d%s", time.Now().Unix(), filepath.Ext(fileHeader.Filename))
	contentLength := fileHeader.Size

	_, err := uploader.Client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket:        aws.String(uploader.BucketName),
		Key:           aws.String(fileName),
		Body:          bytes.NewReader(buffer),
		ContentLength: &contentLength,
		ContentType:   aws.String(fileHeader.Header.Get("Content-Type")),
		ACL:           types.ObjectCannedACLPublicRead,
	})

	if err != nil {
		return "", fmt.Errorf("unable to upload %q to %q, %v", fileName, uploader.BucketName, err)
	}

	return fileName, nil
}
