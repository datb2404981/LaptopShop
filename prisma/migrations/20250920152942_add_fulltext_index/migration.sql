-- CreateIndex
CREATE FULLTEXT INDEX `products_name_shortDesc_detailDesc_factory_target_idx` ON `products`(`name`, `shortDesc`, `detailDesc`, `factory`, `target`);
