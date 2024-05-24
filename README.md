# Du-an-tot-nghiep
clone git về máy: git clone https://github.com/doan02012004/Du-an-tot-nghiep.git
# Branch

Khi clone về máy thì làm các bước sau:
 - cd vào thư mục đã clone về.  
 - liệt kê hết các nhánh bằng lệnh : git branch -a.  
 - dùng lệnh git checkout <tên_branch> để chuyển đến branch mà bạn muốn dùng.  
 - nếu chưa tồn tại branch ở cục bộ thì dùng lệnh : git checkout -b <local_branch_name> origin/<remote_branch_name> <br>
    ví dụ: bạn chưa có branch layout ở local mà chỉ tồn tại ở dạng remote/origin/layout thì bạn dùng lệnh: <br>
    git checkout -b layout origin/layout

# Layout
1. Cách đặt tên branch đối với layout
- Yêu cầu khi code 1 trang giao diện nào đó thì tạo 1 branch có tên là " layout-<tên trang đó>" từ branch layout:<br>

Các bước như sau:
- git checkout layout (chuyển về branch layout)
- git checkout -b layout-homepage (tạo một branch có tên layout/homepage từ branch layout)
2. Cách merge về branch layout 
Ví dụ merge branch layout-homepag về branch layout:
- git checkout layout
- git merge layout-homepage 
- git push origin layout

Nếu có xung đột khi đẩy thì phải báo cáo ngay cho nhóm để giải quyết

# Client 
chưa triển khai

# Server 
chưa triển khai 
   