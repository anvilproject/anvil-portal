---
title: "Using Images"
author: "AnVIL"
description: "Instructions on how to include images in AnVIL markdown."
---

# Using Images

To include an image in your page:

1. Create the image and save as a .png file with a width of 600px.
1. Upload the image to the ```_images``` folder in the same directory of the page that will use the image, creating the ```_image``` folder if required.
1. Reference the image in the markdown.

## Uploading the Image to an "_images" Folder

Using the github web interface, navigate to the parent folder of your page and add the image to an `_images` folder. 

In the github editor you can not create an empty folder so if the folder does not exist it will be created during the upload step.

## Referencing the Image in the Markdown

To reference the image we use markdown like:

```
![AnVIL Image](../_images/anvil-image.png "AnVIL Portal Image!")
```

Note the `../_images/` preceding the image name. This is required to tell the CMS where the image is. 

You can also add a caption to the image using an HTML style custom tag like:

```
<figure-caption>Figure 1. The original AnVIL homepage image.</figure-caption>
```

This renders like:

![AnVIL Image](../_images/anvil-image.png "AnVIL Portal Image!")
<figure-caption>Figure 1. The the image included using the markdown above.</figure-caption>

>####TIP
>You can check if the image link is correct by using the preview link in the markdown editor.

## Controlling Image Size

Images wider than the page channel will be sized to fit. Images narrower than the page channel will render their natural size.






