import { prisma } from "./client";

const initDatabase = async () => {
  // Seed Roles first
  const countRole = await prisma.role.count();
  if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        { name: "ADMIN", description: "Admin thì full quyền" },
        { name: "USER", description: "User chỉ có thể mua hàng" },
      ],
      skipDuplicates: true,
    });
    console.log(">>> CREATED ROLES");
  }

  // Then Seed Users
  const countUser = await prisma.user.count();
  if (countUser === 0) {
    const adminRole = await prisma.role.findFirst({ where: { name: "ADMIN" } });
    const userRole = await prisma.role.findFirst({ where: { name: "USER" } });

    if (!adminRole || !userRole) {
      console.error("Default roles not found. Cannot seed users.");
      return; // Exit if roles aren't there
    }

    await prisma.user.createMany({
      data: [
        {
          username: "hoidanit@gmail.com",
          password: "123456",
          fullname: "Nguyễn Văn A",
          address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
          phone: "0905123456",
          accountType: "SYSTEM",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          roleId: userRole.id, // Assign USER role
        },
        {
          username: "nguyenvanb@gmail.com",
          password: "123456",
          fullname: "Nguyễn Văn B",
          address: "45 Trần Hưng Đạo, Hà Nội",
          phone: "0912345678",
          accountType: "ADMIN",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
          roleId: adminRole.id, // Assign ADMIN role
        },
        {
          username: "tranthic@gmail.com",
          password: "123456",
          fullname: "Trần Thị C",
          address: "78 Nguyễn Huệ, Đà Nẵng",
          phone: "0932123456",
          accountType: "CUSTOMER",
          avatar: "https://randomuser.me/api/portraits/women/3.jpg",
          roleId: userRole.id, // Assign USER role
        },
        {
          username: "lemanhd@gmail.com",
          password: "123456",
          fullname: "Lê Mạnh D",
          address: "56 Phan Chu Trinh, Cần Thơ",
          phone: "0978456123",
          accountType: "STAFF",
          avatar: "https://randomuser.me/api/portraits/men/4.jpg",
          roleId: userRole.id, // Assign USER role
        },
        {
          username: "phamthie@gmail.com",
          password: "123456",
          fullname: "Phạm Thị E",
          address: "12 Hai Bà Trưng, Hải Phòng",
          phone: "0987123456",
          accountType: "CUSTOMER",
          avatar: "https://randomuser.me/api/portraits/women/5.jpg",
          roleId: userRole.id, // Assign USER role
        },
      ],
    });
    console.log(">>> CREATED USERS");
  }

  if (countRole > 0 && countUser > 0) {
      console.log(">>> ALREADY INIT DATA...");
  }
};

export { initDatabase };
 