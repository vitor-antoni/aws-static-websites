# AWS Static Websites
### Getting Start
Hi there, friends. How are you doing? Hope you're weell. 😁

In this repository, I'd like to share my experience architecting a Static Website with AWS S3 Buckets and CloudFront CDN. Here, you'll find all the steps to set up a serverless environment to host a static website using AWS services.

To make the most of this documentation, has a few prerequisites that you should have.
- Understanding about what is AWS S3 Bucket and it main purpose.
- Understanding about what is a CDN (Content Delivery Network).
- IAM Permissions to create S3 Bucket and CloudFront distributions.
- Last but not least, willingness to learn.

If you have any questions or sugestions, feel free to make comments.

<br>

## 🚀 Documentation Topics
#### Bellow, you can see all topics addressed in this documentation.

- **S3 Bucket creation** <br>
- **CloudFront distribution creation** <br>
- **CloudFront OAC creation** <br>
- **S3 Bucket policy creation** <br>
- **Upload archives to S3 Bucket** <br>
- **Aditional configurations to CloudFront distribution** <br>

<br>

## 1️⃣ S3 Bucket creation
At first, we must create a S3 Bucket to host our website archieves. To achieve it, follow these steps bellow.<br>

1. At S3 console, click on "Create Bucket".
<img width="1360" height="412" alt="image" src="https://github.com/user-attachments/assets/926394ef-7be1-449b-9502-115768b9ae7e" /><br><br><br>

2. Specify a global unique bucket name.
<img width="1200" height="806" alt="image" src="https://github.com/user-attachments/assets/e2efb922-a784-4e3b-9f1c-286bcbdf4356" /><br>

> You can keep "**Block public access**" option selected. Our S3 Bucket won't be a public bucket, the clients will access the website through CloudFront distribution. So, only CloudFront will really acces this Bucket, however, a specific configuration, defined in "S3 Bucket policy creation" section, is needed.

<br>

3. Finally, click on "create bucket".<br>

4. Object Ownership, Bucket versioning, tags, encryption and object lock is out of scope of this documentation. Feel free to choice whatever you want or need.<br><br><br>

## 2️⃣ CloudFront distribution creation
After creating S3 Bucket, let's create a CloudFront distribution, that is, the CDN.<br>

1. At CloudFront console, click on "Create a CloudFront Distribution".<br>
<img width="1291" height="249" alt="image" src="https://github.com/user-attachments/assets/0811438b-c801-41a7-8d1c-1d54a2a9daa1" /><br><br><br>

2. Specify a CDN name.
<img width="1085" height="693" alt="image" src="https://github.com/user-attachments/assets/4a32b4fd-132c-46e1-8b1c-47998dd694bd" /><br>

> We will discuss about "Custom domain" option in "Aditional configurations to CloudFront distribution" section.

<br>

3. Next page, specify S3 Bucket as a CloudFront origin. You can select recently created bucket by clicking on "Browse S3", but if the S3 Bucket was created in another AWS Account, no worries, just specify de Bucket Endpoint, as follow: _bucket-name_.s3._region_.amazonaws.com. **REMEMBER:** replate "bucket-name" by your bucket name and "region" by the region ID where the Bucket was created.<br>
<img width="1099" height="485" alt="image" src="https://github.com/user-attachments/assets/c5530f99-045f-4ef0-a6c6-15f350c0be2a" /><br><br><br>

4. We won't add WAF (Web Application Firewall) in this tutorial.<br>

5. Review and create your CloudFront Distribution.<br><br><br>

## 3️⃣ CloudFront OAC creation
Still in CloudFront console, let's create a OAC (Origin Access Control). It resource will allow our CloudFront distribution by accessing the S3 Bucket.<br>

1. Click on "Origin Access" located on Left Menu, bellow of **Security** and create a OAC.<br>
<img width="1196" height="625" alt="image" src="https://github.com/user-attachments/assets/c3753e51-4435-43f6-868a-22619648a364" /><br><br><br>

2. Specify a name to this OAC and select "Sign Requests" option.<br>
<img width="469" height="438" alt="image" src="https://github.com/user-attachments/assets/1091b2e1-36f5-471e-86a0-87d5cca69c38" /><br><br><br>

3. Back to CloudFront Distribution recently recreated, go to "origins" and select the registered origin, it may be your S3 Bucket.<br>
4. After selecting it, click on "Edit" and change "Origin Access" option from **"Public"** to "Origin Access Control Settings" and specify your OAC.<br>
<img width="1000" height="519" alt="image" src="https://github.com/user-attachments/assets/273e12c6-ce79-4f8e-a5cc-8115d10d903d" /><br><br><br>

5. Will be displayed a warning about Bucket Policy, click on "Copy policy" button and go to the next section.<br>
<img width="1282" height="86" alt="image" src="https://github.com/user-attachments/assets/bc067cbf-edb4-43a6-a6ef-2877a79e25f1" /><br><br><br>

## 4️⃣ S3 Bucket policy creation
To allow our CloudFront Function access our S3 Bucket, we must set up a Bucket Policy allow this access. So, with policy in your clipboard, let's to configure it.<br>

1. Back to S3 Console and select your S3 Bucket registered as CloudFront origin.<br>
2. Go to "Permissions" and edit the Bucket Policy.<br>
3. Paste the policy copied from CloudFront Console and save. For knowledge, this policy allows S3 Get Object requests only from CloudFront and, for better security, is specified the CloudFront Distribution ARN in _conditions_ block.<br>
<img width="541" height="521" alt="image" src="https://github.com/user-attachments/assets/c935826a-97c7-467e-bc84-a167def1b443" /><br><br><br>

## 5️⃣ Upload archives to S3 Bucket
At this momment, we are already abble to access this serverless website, but first, we must send the website archives to S3 Bucket.<br>

1. In S3 Bucket, click on "Upload" and send website archives.<br>
<img width="1002" height="464" alt="image" src="https://github.com/user-attachments/assets/87d9da77-91a7-42dd-b332-67bb2bdf9807" /><br><br><br>

2. Access your website through CloudFront using distribution domain name.<br>
<img width="688" height="232" alt="image" src="https://github.com/user-attachments/assets/555a53af-b724-4e65-ad6c-2eacb2ac5c0b" /><br><br>

3. Note that are showed a "Access Denied" page. It occurs because `index.html` isn't being specifying in URL. So, let's specify it information and validate again if that works. In "Aditional configurations to CloudFront distribution" section has a way to work arround of this behavior.<br>
<img width="618" height="151" alt="image" src="https://github.com/user-attachments/assets/e8ac752b-dcdc-405a-9c94-ea37b8df4025" /><br><br><br>

4. Access working with success.
<img width="1134" height="611" alt="image" src="https://github.com/user-attachments/assets/5bf2b824-f5a2-4777-8e14-e37b545b7436" /><br><br><br>

## 6️⃣ Aditional configurations to CloudFront distribution
Will be listed bellow some configurations that can be used in addition to make your website more user friendly.<br>
- Use a custom distribution domain name allows us to use our own DNS domains, but requires a TLS certificate with AWS ACM (Amazon Certificate Manager).<br>
- Specify a **root object**, so won't be necessary use `index.html` in URL, CloudFront will automatically use this object to request to your's origin (S3 Bucket).<br>
- You can configure error pages to your website at the CDN level. For it, specify a path and error page object located inside your S3 Bucket registered as origin, so distribution will search by path and object specified in this configuration to show this page to a user when some HTTP Error Code was returned.<br>
- CloudFront Functions and Lambda@Edge Functions can be used to analyze and customize request and response events generated in CloudFront. I will create another documentation only for it.<br>

<br>

## 📑 Additional informations

This documentation was created to helps any person who want modernize your's website infrastructure.
If I helped you any way, please follow/connect me in my LinkedIn to keep inside about others AWS services documentation: [LinkedIn](https://www.linkedin.com/in/vitor-silva-de-antoni/)
