using System.Security.Cryptography;
using System.Text;

namespace ThesisStudentPortfolio2024.Services
{
    public class EncryptionService
    {
        private readonly string _key; // Ensure key is securely stored and managed

        public EncryptionService(string key)
        {
            _key = key;
        }

        // Encrypt a plain text string using AES
        public string Encrypt(string plainText)
        {
            var keylength = _key.Length;

            //byte[] keyBytes = Encoding.UTF8.GetBytes(_key);
            byte[] keyBytes = Convert.FromBase64String(_key);
            using (var aes = Aes.Create())
            {
                aes.Key = keyBytes;
                aes.GenerateIV();

                using (var encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
                {
                    using (var ms = new MemoryStream())
                    {
                        // Write the IV to the beginning of the stream
                        ms.Write(aes.IV, 0, aes.IV.Length);

                        using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                        {
                            using (var writer = new StreamWriter(cs))
                            {
                                writer.Write(plainText);
                            }
                        }

                        return Convert.ToBase64String(ms.ToArray());
                    }
                }
            }
        }

        // Decrypt an encrypted text string using AES
        public string Decrypt(string cipherText)
        {
            byte[] fullCipher = Convert.FromBase64String(cipherText);
            byte[] keyBytes = Convert.FromBase64String(_key);
            //byte[] keyBytes = Encoding.UTF8.GetBytes(_key);

            using (var aes = Aes.Create())
            {
                aes.Key = keyBytes;

                // Extract the IV from the start of the encrypted data
                byte[] iv = new byte[aes.BlockSize / 8];
                Array.Copy(fullCipher, iv, iv.Length);
                aes.IV = iv;

                using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
                {
                    using (var ms = new MemoryStream(fullCipher, iv.Length, fullCipher.Length - iv.Length))
                    {
                        using (var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                        {
                            using (var reader = new StreamReader(cs))
                            {
                                return reader.ReadToEnd();
                            }
                        }
                    }
                }
            }
        }
    }
}
