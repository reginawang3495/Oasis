//
//  ViewController.swift
//  oasis
//
//  Created by Shon Xiao on 4/6/19.
//  Copyright © 2019 Shon Xiao. All rights reserved.
//
import Foundation
import UIKit

class ViewController: UIViewController,
    UIImagePickerControllerDelegate,
UINavigationControllerDelegate {
    
    
    @IBOutlet weak var long: UITextField!
    @IBOutlet weak var lat: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBOutlet weak var myImg: UIImageView!
    
    struct Photo: Codable {
        let imageString: String
    }
    
    @IBAction func checklock(_ sender: UIButton) {
        let headers = [
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "ddf76906-687d-4420-9115-cf86a49c88f1"
        ]
        let parameters = [
            "key": "apples",
            "phoneNum": 16266795925,
            "long": 14.444,
            "lat": 22.2222
            ] as [String : Any]
        
        let postData = try? JSONSerialization.data(withJSONObject: parameters, options: [])
        
        
        let request = NSMutableURLRequest(url: NSURL(string: "https://radiant-mesa-33481.herokuapp.com/DangerZone")! as URL,
                                          cachePolicy: .useProtocolCachePolicy,
                                          timeoutInterval: 10.0)
        request.httpMethod = "POST"
        request.allHTTPHeaderFields = headers
        request.httpBody = postData as! Data
        
        let session = URLSession.shared
        let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
            if (error != nil) {
                print(error)
            } else {
                let httpResponse = response as? HTTPURLResponse
                print(httpResponse)
            }
        })
        
        dataTask.resume()
        
        let alert = UIAlertView(title: "Be careful",
                                message: "You're in a dangerous area",
                                delegate: nil,
                                cancelButtonTitle: "I will")
        alert.show()
    }
    @IBAction func cambutton(_ sender: UIButton) {
        if UIImagePickerController.isSourceTypeAvailable(.camera) {
            let imagePicker = UIImagePickerController()
            imagePicker.delegate = self
            imagePicker.sourceType = .camera;
            imagePicker.allowsEditing = false
            self.present(imagePicker, animated: true, completion: nil)
        }
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        if let pickedImage = info[UIImagePickerController.InfoKey.originalImage] as? UIImage {
            myImg.contentMode = .scaleToFill
            myImg.image = pickedImage
            //let compressedData = pickedImage.jpegData(compressionQuality: 0.01)
            //guard let compressedImage = UIImage(data: compressedData!) else { return }
            //guard let imgString = compressedImage.toString() else { return }
            //let photo = Photo(imageString: imgString)
            //guard let uploadData = try? JSONEncoder().encode(photo) else { return }
            //UIImageWriteToSavedPhotosAlbum(pickedImage, nil, nil, nil)
            do {
                
                let headers = [
                    "Content-Type": "image/jpeg",
                    "Authorization": "Bearer ya29.GlvkBhmpqgmeMinDYEQuxLmLbQ5zwqeNFspEVq1TnQhiGpyz1iLXsST0wFGN0ap3ihp5CQkS5VUoJ8G4I-S5ASjNnr5LlG4U0LvUytom75mau6NrKepHOfpr7s3T",
                    "cache-control": "no-cache",
                    "Postman-Token": "2a30eae1-af88-4d4a-90f4-366e56980450"
                ]
                
                let request = NSMutableURLRequest(url: NSURL(string: "https://www.googleapis.com/upload/storage/v1/b/athenahacksoasis/o?uploadType=media&name=object%20")! as URL,
                                                  cachePolicy: .useProtocolCachePolicy,
                                                  timeoutInterval: 10.0)
                request.httpMethod = "POST"
                request.allHTTPHeaderFields = headers
                
                let jpgData = pickedImage.jpegData(compressionQuality: 0.25)
                request.httpBodyStream = InputStream(data: jpgData!)
                //let task = ses.uploadTask(withStreamedRequest: req as URLRequest)
                //task.resume()
                
                let session = URLSession.shared
                let dataTask = session.uploadTask(withStreamedRequest: request as URLRequest)
                //let dataTask = session.uploadTask(with: request as URLRequest, from: uploadData) {data, response, error in
                //if let error = error {
                //  print ("error: \(error)")
                // return
                //}
                //guard let response = response as? HTTPURLResponse,
                //  (200...299).contains(response.statusCode) else {
                //    print ("server error")
                //  return
                //}
                //if let mimeType = response.mimeType,
                //  mimeType == "application/json",
                //let data = data,
                //let dataString = String(data: data, encoding: .utf8) {
                //print ("got data: \(dataString)")
                //}
                //}
                
                dataTask.resume()
                
            }
            catch {
                let alert = UIAlertView(title: "Oh no",
                                        message: "Your image cannot be converted",
                                        delegate: nil,
                                        cancelButtonTitle: "Ok")
                alert.show()
            }
        }
        picker.dismiss(animated: true, completion: nil)
    }
    
    func getDocumentsDirectory() -> URL {
        let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
        return paths[0]
    }
    
}

extension UIImage {
    func toString() -> String? {
        let data: Data? = self.pngData()
        return data?.base64EncodedString(options: .endLineWithLineFeed)
    }
}

extension Dictionary {
    func percentEscaped() -> String {
        return map { (key, value) in
            let escapedKey = "\(key)".addingPercentEncoding(withAllowedCharacters: .urlQueryValueAllowed) ?? ""
            let escapedValue = "\(value)".addingPercentEncoding(withAllowedCharacters: .urlQueryValueAllowed) ?? ""
            return escapedKey + "=" + escapedValue
            }
            .joined(separator: "&")
    }
}

extension CharacterSet {
    static let urlQueryValueAllowed: CharacterSet = {
        let generalDelimitersToEncode = ":#[]@" // does not include "?" or "/" due to RFC 3986 - Section 3.4
        let subDelimitersToEncode = "!$&'()*+,;="
        
        var allowed = CharacterSet.urlQueryAllowed
        allowed.remove(charactersIn: "\(generalDelimitersToEncode)\(subDelimitersToEncode)")
        return allowed
    }()
}
